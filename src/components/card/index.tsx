import React, { Component, Fragment } from "react";
import styles from "./index.module.css";
import { Exercise } from "../../clients/exerciseApi";
import CardInfo from "./cardInfo";

type CardProps = {
  exercise: Exercise;
  shouldShowInfo: boolean;
  onClick: (exerciseId: number) => void;
};

export default class Card extends Component<CardProps> {
  render() {
    const {
      exercise: { id, title, type, description, muscles, equipment, images },
      shouldShowInfo,
      onClick,
    } = this.props;

    return (
      <Fragment>
        <div
          className={`${styles.card} ${shouldShowInfo && styles.cardWithInfo}`}
          onClick={() => onClick(id)}
        >
          <h3>{title}</h3>
          <div className={styles.exerciseType}>{type}</div>
          <p>{description}</p>
          <div className={styles.lists}>
            <div>
              <div className={styles.muscleLabel}>Primary</div>
              <ul>
                {muscles.primary.map((muscle, i) => (
                  <li key={i}>{muscle}</li>
                ))}
              </ul>
            </div>
            {muscles.secondary.length > 0 && (
              <div>
                <div className={styles.muscleLabel}>Secondary</div>
                <ul>
                  {muscles.secondary.map((muscle, i) => (
                    <li key={i}>{muscle}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <div className={styles.muscleLabel}>Equipment</div>
              <ul>
                {equipment.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {shouldShowInfo && <CardInfo exerciseId={id} imageUrls={images.svg} />}
      </Fragment>
    );
  }
}
