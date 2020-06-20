import React, { Component } from "react";
import throttle from "lodash.throttle";
import LoadingSpinner from "../loadingSpinner";
import styles from "./index.module.css";

type InfiniteGridListProps = {
  hasMore?: boolean;
  loadMore?: () => void;
  filters?: Array<string>;
  onFilterChange?: (name: string) => void;
  selectedFilters?: Array<string>;
};

export default class InfiniteGridList extends Component<InfiniteGridListProps> {
  handleScroll = (e: React.UIEvent) => {
    const element = e.currentTarget;
    const scrollPercent =
      (element.clientHeight / (element.scrollHeight - element.scrollTop)) * 100;
    if (scrollPercent > 60) {
      this.handleScrollToBottom();
    }
  };

  handleScrollToBottom = throttle(() => this.props.loadMore(), 300, {
    trailing: false,
  });

  getHandleFilterClick = (filter: string) =>
    this.props.onFilterChange != null
      ? (event: React.UIEvent) => {
          this.props.onFilterChange(filter);
        }
      : null;

  render() {
    const { loadMore, hasMore, filters, selectedFilters } = this.props;

    return (
      <div className={styles.container}>
        {filters && (
          <div className={styles.filterList}>
            {filters.map((filter) => (
              <div
                key={filter}
                className={`${styles.filter} ${
                  selectedFilters.includes(filter) && styles.selectedFilter
                }`}
                onClick={this.getHandleFilterClick(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        )}
        <div
          className={styles.scrollingDiv}
          onScroll={loadMore && hasMore ? this.handleScroll : null}
        >
          <div className={styles.gridList}>{this.props.children}</div>
          {hasMore && <LoadingSpinner />}
        </div>
      </div>
    );
  }
}
