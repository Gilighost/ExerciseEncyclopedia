import {
  DefaultApi as ExerciseApi,
  Configuration as ExerciseApiConfiguration,
  ExerciseGetExercisesRequest,
  MuscleGroup,
} from "./client";
import fetchBlob from "../../utility/fetchBlob";

const exerciseApi = new ExerciseApi(
  new ExerciseApiConfiguration({ basePath: `${process.env.PUBLIC_URL}/api/v1` })
);

const baseImagePath = `${process.env.PUBLIC_URL}/api/images`;

const pageSize = 50;

const getExercises = (
  { offset, muscleGroups, search }: ExerciseGetExercisesRequest = {
    offset: 0,
    muscleGroups: [],
    search: null,
  }
) =>
  exerciseApi.exerciseGetExercises({
    limit: pageSize,
    offset,
    muscleGroups: muscleGroups.length ? muscleGroups : undefined,
    search: search ? search : undefined,
  });

const getExerciseInstruction = (exerciseId: number) =>
  exerciseApi.exerciseGetExerciseInstruction({ exerciseId });

const parseMuscleGroup = (muscleGroup: string) =>
  muscleGroup
    ? Object.values(MuscleGroup)[Object.keys(MuscleGroup).indexOf(muscleGroup)]
    : undefined;

const getBase64DataUrls = (urls: Array<string>) =>
  Promise.all(urls.map((url) => fetchBlob(`${baseImagePath}/${url}`)));

export * from "./client/models";
export default {
  getExercises,
  getExerciseInstruction,
  getMuscleGroup: parseMuscleGroup,
  getBase64DataUrls,
  pageSize,
};
