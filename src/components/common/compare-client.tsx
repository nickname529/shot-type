"use client";

import { useEffect, useMemo, useState } from "react";
import { SelectField } from "@/components/common/select-field";
import { storageKeys } from "@/lib/constants";
import { cameras, filmStocks, lenses } from "@/lib/data";
import { formatWon } from "@/lib/utils";
import { readJson, writeJson } from "@/lib/storage";

export function CompareClient() {
  const [cameraIds, setCameraIds] = useState<string[]>([]);
  const [lensIds, setLensIds] = useState<string[]>([]);
  const [filmIds, setFilmIds] = useState<string[]>([]);

  useEffect(() => {
    setCameraIds(readJson<string[]>(storageKeys.compareCameras, cameras.slice(0, 3).map((camera) => camera.id)));
    setLensIds(lenses.slice(0, 3).map((lens) => lens.id));
    setFilmIds(filmStocks.slice(0, 3).map((film) => film.id));
  }, []);

  const selectedCameras = useMemo(() => cameraIds.map((id) => cameras.find((camera) => camera.id === id)).filter(Boolean), [cameraIds]);
  const selectedLenses = useMemo(() => lensIds.map((id) => lenses.find((lens) => lens.id === id)).filter(Boolean), [lensIds]);
  const selectedFilms = useMemo(() => filmIds.map((id) => filmStocks.find((film) => film.id === id)).filter(Boolean), [filmIds]);

  function updateCamera(index: number, value: string) {
    const next = [...cameraIds];
    next[index] = value;
    const compact = Array.from(new Set(next.filter(Boolean))).slice(0, 4);
    setCameraIds(compact);
    writeJson(storageKeys.compareCameras, compact);
  }

  function updateLens(index: number, value: string) {
    const next = [...lensIds];
    next[index] = value;
    setLensIds(Array.from(new Set(next.filter(Boolean))).slice(0, 4));
  }

  function updateFilm(index: number, value: string) {
    const next = [...filmIds];
    next[index] = value;
    setFilmIds(Array.from(new Set(next.filter(Boolean))).slice(0, 4));
  }

  return (
    <div className="grid gap-10">
      <section className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <SelectField key={index} label={`바디 ${index + 1}`} value={cameraIds[index] ?? ""} onChange={(event) => updateCamera(index, event.target.value)}>
            <option value="">선택 안 함</option>
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.brand} {camera.model}
              </option>
            ))}
          </SelectField>
        ))}
      </section>

      <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-soft">
        <table className="min-w-[760px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              <th className="p-4 font-semibold text-ink">항목</th>
              {selectedCameras.map((camera) => (
                <th key={camera!.id} className="p-4 font-semibold text-ink">
                  {camera!.brand} {camera!.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-muted">
            {[
              ["가격", ...selectedCameras.map((camera) => `${formatWon(camera!.priceNew)} / 중고 ${camera!.priceUsed ? formatWon(camera!.priceUsed) : "없음"}`)],
              ["타입", ...selectedCameras.map((camera) => camera!.type)],
              ["센서", ...selectedCameras.map((camera) => camera!.sensorSize)],
              ["무게", ...selectedCameras.map((camera) => `${camera!.weight}g`)],
              ["렌즈", ...selectedCameras.map((camera) => (camera!.interchangeableLens ? camera!.mount : "고정렌즈"))],
              ["강점", ...selectedCameras.map((camera) => camera!.strengths.join(", "))],
              ["주의", ...selectedCameras.map((camera) => camera!.weaknesses.join(", "))]
            ].map((row) => (
              <tr key={row[0]} className="border-b border-line last:border-0">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="max-w-sm p-4 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <SelectField key={index} label={`렌즈 ${index + 1}`} value={lensIds[index] ?? ""} onChange={(event) => updateLens(index, event.target.value)}>
            <option value="">선택 안 함</option>
            {lenses.map((lens) => (
              <option key={lens.id} value={lens.id}>
                {lens.brand} {lens.model}
              </option>
            ))}
          </SelectField>
        ))}
      </section>

      <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-soft">
        <table className="min-w-[760px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              <th className="p-4 font-semibold text-ink">항목</th>
              {selectedLenses.map((lens) => (
                <th key={lens!.id} className="p-4 font-semibold text-ink">
                  {lens!.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-muted">
            {[
              ["마운트", ...selectedLenses.map((lens) => lens!.mount)],
              ["가격", ...selectedLenses.map((lens) => formatWon(lens!.price))],
              ["초점거리", ...selectedLenses.map((lens) => lens!.focalLength)],
              ["조리개", ...selectedLenses.map((lens) => lens!.maxAperture)],
              ["무게", ...selectedLenses.map((lens) => `${lens!.weight}g`)],
              ["용도", ...selectedLenses.map((lens) => lens!.recommendedUse.join(", "))],
              ["추천 이유", ...selectedLenses.map((lens) => lens!.reason)]
            ].map((row) => (
              <tr key={row[0]} className="border-b border-line last:border-0">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="max-w-sm p-4 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <SelectField key={index} label={`필름 ${index + 1}`} value={filmIds[index] ?? ""} onChange={(event) => updateFilm(index, event.target.value)}>
            <option value="">선택 안 함</option>
            {filmStocks.map((film) => (
              <option key={film.id} value={film.id}>
                {film.brand} {film.model}
              </option>
            ))}
          </SelectField>
        ))}
      </section>

      <div className="overflow-x-auto rounded-lg border border-line bg-white shadow-soft">
        <table className="min-w-[760px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              <th className="p-4 font-semibold text-ink">항목</th>
              {selectedFilms.map((film) => (
                <th key={film!.id} className="p-4 font-semibold text-ink">
                  {film!.brand} {film!.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-muted">
            {[
              ["ISO", ...selectedFilms.map((film) => `${film!.iso}`)],
              ["타입", ...selectedFilms.map((film) => film!.type)],
              ["포맷", ...selectedFilms.map((film) => film!.filmFormat.join(", "))],
              ["가격", ...selectedFilms.map((film) => formatWon(film!.price))],
              ["특징", ...selectedFilms.map((film) => film!.traits.join(", "))],
              ["추천 용도", ...selectedFilms.map((film) => film!.bestFor.join(", "))],
              ["주의", ...selectedFilms.map((film) => film!.caution)]
            ].map((row) => (
              <tr key={row[0]} className="border-b border-line last:border-0">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="max-w-sm p-4 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
