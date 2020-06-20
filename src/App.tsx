import React, { Component } from "react";
import debounce from "lodash.debounce";
import InfiniteGridList from "./components/gridList";
import Card from "./components/card";
import SearchInput from "./components/searchInput";

import ExerciseApi, { Exercise, MuscleGroup } from "./clients/exerciseApi";

import styles from "./App.module.css";
import InfoButton from "./components/infoButton";

type AppState = {
  exercises: Array<Exercise>;
  hasMoreExercises: boolean;
  selectedFilters: Array<string>;
  selectedExerciseId?: number;
  searchText: string;
  isLoading: boolean;
};

class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    exercises: [],
    hasMoreExercises: true,
    selectedFilters: [],
    selectedExerciseId: null,
    searchText: "",
    isLoading: true,
  };

  componentDidMount() {
    ExerciseApi.getExercises().then((exercises) => {
      this.setState({ exercises, isLoading: true });
    });
  }

  componentDidUpdate(prevProps: {}, prevState: AppState) {
    const {
      selectedFilters: prevSelectedFilters,
      searchText: prevSearchText,
    } = prevState;
    const { selectedFilters, searchText } = this.state;

    if (
      prevSelectedFilters.length !== selectedFilters.length ||
      prevSearchText !== searchText
    ) {
      this.loadExercises({ selectedFilters, searchText });
    }
  }

  handleExercisesResponse = (
    exercises: Array<Exercise>,
    shouldAppendExercises: boolean = false
  ) => {
    if (exercises.length || !shouldAppendExercises) {
      this.setState((state: AppState) => ({
        exercises: shouldAppendExercises
          ? [...state.exercises, ...exercises]
          : exercises,
        hasMoreExercises: exercises.length === ExerciseApi.pageSize,
        isLoading: false,
      }));
    } else {
      this.setState((state: AppState) => ({
        hasMoreExercises: false,
        isLoading: false,
      }));
    }
  };

  loadExercises = debounce(({ selectedFilters, searchText }) => {
    ExerciseApi.getExercises({
      offset: 0,
      muscleGroups: selectedFilters.map(ExerciseApi.getMuscleGroup),
      search: searchText,
    }).then((exercises) => this.handleExercisesResponse(exercises));
  }, 300);

  loadMoreExercises = () => {
    const {
      hasMoreExercises,
      selectedFilters,
      searchText,
      exercises,
    } = this.state;
    if (hasMoreExercises) {
      ExerciseApi.getExercises({
        offset: exercises.length,
        muscleGroups: selectedFilters.map(ExerciseApi.getMuscleGroup),
        search: searchText,
      }).then((exercises) => this.handleExercisesResponse(exercises, true));
    }
  };

  handleFilterChange = (filter: string) => {
    this.setState(({ selectedFilters }) => {
      const newFilters = [...selectedFilters];
      const filterIndex: number = newFilters.indexOf(filter);

      if (filterIndex > -1) {
        newFilters.splice(filterIndex, 1);
      } else {
        newFilters.push(filter);
      }

      return {
        selectedFilters: newFilters,
        hasMoreExercises: true,
        exercises: [],
        isLoading: true,
      };
    });
  };

  handleSearchChange = (searchText: string) => {
    this.setState({
      searchText,
      exercises: [],
      hasMoreExercises: true,
      isLoading: true,
    });
  };

  handleSelectExercise = (exerciseId: number) => {
    this.setState((state) => ({
      selectedExerciseId:
        state.selectedExerciseId !== exerciseId ? exerciseId : null,
    }));
  };

  render() {
    const {
      exercises,
      hasMoreExercises,
      selectedFilters,
      selectedExerciseId,
      searchText,
      isLoading,
    } = this.state;
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>Exercises</h1>
          <SearchInput value={searchText} onChange={this.handleSearchChange} />
          <InfoButton />
        </header>
        <div className={styles.appContent}>
          <InfiniteGridList
            hasMore={hasMoreExercises}
            loadMore={this.loadMoreExercises}
            filters={Object.keys(MuscleGroup)}
            selectedFilters={selectedFilters}
            onFilterChange={this.handleFilterChange}
          >
            {exercises.length || isLoading ? (
              exercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  exercise={exercise}
                  shouldShowInfo={exercise.id === selectedExerciseId}
                  onClick={this.handleSelectExercise}
                />
              ))
            ) : (
              <div className={styles.searchMessage}>
                Can't find any exercises matching: "{searchText}"
              </div>
            )}
          </InfiniteGridList>
          )
        </div>
      </div>
    );
  }
}

export default App;
