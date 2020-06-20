import React, { Component, Fragment } from "react";
import LoadingSpinner from "../loadingSpinner";

import ExerciseApi, { ExerciseInstruction } from "../../clients/exerciseApi";

import styles from "./cardInfo.module.css";

type CardInfoProps = {
  exerciseId: number;
  imageUrls: Array<string>;
};

type CardInfoState = {
  exerciseInstruction: ExerciseInstruction;
  base64Images: Array<string>;
  isLoading: boolean;
};

export default class CardInfo extends Component<CardInfoProps, CardInfoState> {
  state: CardInfoState = {
    isLoading: true,
    exerciseInstruction: null,
    base64Images: null,
  };

  componentDidMount() {
    const { exerciseId, imageUrls } = this.props;
    Promise.all([
      ExerciseApi.getExerciseInstruction(exerciseId),
      ExerciseApi.getBase64DataUrls(imageUrls),
    ]).then(([exerciseInstruction, base64Images]) => {
      this.setState({
        exerciseInstruction,
        base64Images,
        isLoading: false,
      });
    });
  }

  render() {
    const { exerciseInstruction, base64Images, isLoading } = this.state;
    return (
      <div className={styles.cardInfo}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <div className={styles.lists}>
              <h4>Steps:</h4>
              <ol>
                {exerciseInstruction.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {exerciseInstruction.tips.length > 0 && (
                <Fragment>
                  <h4>Tips:</h4>
                  <ul>
                    {exerciseInstruction.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </Fragment>
              )}
            </div>
            <div className={styles.images}>
              {base64Images.map((image, i) => (
                <div key={i}>
                  <img alt={`Exercise diagram ${i + 1}`} src={image} />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
