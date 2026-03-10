import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { AppError } from "../types/api";

const fieldLabelMap: Record<string, string> = {
  body: "Тело запроса",
  className: "Класс",
  name: "Название",
  shortDescription: "Краткое описание",
  description: "Полное описание",
  text: "Описание",
  actionType: "Тип действия",
  range: "Дистанция",
  stat: "Характеристика",
  duration: "Длительность",
  damage: "Урон",
  inCombatCooldown: "Перезарядка в бою",
  outCombatCooldown: "Перезарядка вне боя",
  outCombatCharges: "Заряды вне боя",
  category: "Категория",
  concentration: "Концентрация",
  isChosen: "Выбрано",
  baseEffect: "Базовый эффект",
  activationEffect: "Эффект активации",
  summonEffect: "Эффект призыва",
  aspectEffect: "Эффект аспекта",
  password: "Пароль",
  source: "Источник",
  exportedAt: "Время экспорта",
  data: "Данные",
  skills: "Заклинания",
  passives: "Пассивки",
  mushrooms: "Грибы",
};

const getFieldLabel = (field: string): string => {
  return fieldLabelMap[field] || field;
};

const getFieldName = (issue: ZodIssue): string => {
  if (issue.path.length === 0) {
    return "body";
  }

  return String(issue.path[issue.path.length - 1]);
};

const formatIssueMessage = (issue: ZodIssue): string => {
  const field = getFieldName(issue);
  const label = getFieldLabel(field);
  const issueData = issue as unknown as Record<string, unknown>;

  if (issue.code === "invalid_type") {
    if (issueData.input === undefined) {
      return `Поле \"${label}\" обязательно`;
    }
    return `Некорректный тип поля \"${label}\"`;
  }

  if (issue.code === "too_small") {
    if (issue.minimum === 1) {
      return `Поле \"${label}\" не может быть пустым`;
    }
    return `Поле \"${label}\" должно быть не короче ${issue.minimum}`;
  }

  if (issue.code === "too_big") {
    return `Поле \"${label}\" должно быть не длиннее ${issue.maximum}`;
  }

  if (issue.code === "invalid_value") {
    return `Недопустимое значение поля \"${label}\"`;
  }

  if (issue.code === "invalid_format") {
    return `Некорректный формат поля \"${label}\"`;
  }

  return issue.message;
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Log all errors for debugging
  console.error("Error caught by errorHandler:", err);

  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "body";
      return {
        path,
        message: formatIssueMessage(issue),
      };
    });

    res.status(400).json({
      error: "Ошибка валидации",
      message: issues[0]?.message || "Некорректные данные запроса",
      details: {
        fields: issues,
        formErrors: err.flatten().formErrors,
      },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
    return;
  }

  res.status(500).json({
    error: "Внутренняя ошибка сервера",
  });
};
