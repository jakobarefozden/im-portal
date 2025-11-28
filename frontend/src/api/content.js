// src/api/content.js

import { request } from "./client";

// /api/classes
export function getClasses() {
  return request("/api/classes");
}

// /api/classes/{classID}
export function getClassById(classId) {
  return request(`/api/classes/${classId}`);
}

// /api/courses/{classID}/{courseID}
export function getCourse(classId, courseId) {
  return request(`/api/courses/${classId}/${courseId}`);
}

// /api/themes/{classID}/{courseID}/{themeID}
export function getTheme(classId, courseId, themeId) {
  return request(`/api/themes/${classId}/${courseId}/${themeId}`);
}

// /api/subthemes/{classID}/{courseID}/{themeID}/{subID}
export function getSubTheme(classId, courseId, themeId, subId) {
  return request(
    `/api/subthemes/${classId}/${courseId}/${themeId}/${subId}`
  );
}
