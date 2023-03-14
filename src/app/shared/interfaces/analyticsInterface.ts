interface OverviewItemInterface {
      percent: number;
      compare: number;
      yesterday: number;
      isHigher: boolean;
}
export interface OverviewInterface {
      gain: OverviewItemInterface;
      ordersCount: OverviewItemInterface;
}

interface AnalyticsChartItemInterface {
      gain: number;
      order: number;
      label: string;
}

export interface AnalyticsInterface {
      average: number;
      chart: AnalyticsChartItemInterface[];
}
