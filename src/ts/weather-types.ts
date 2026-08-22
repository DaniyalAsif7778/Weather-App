export interface WeatherHour {
  conditions?: string;
  datetime: string;
  humidity?: number;
  feelslike?: number;
  icon: string;
  precipprob: number;
  pressure?: number;
  temp: number;
  uvindex?: number;
  visibility?: number | null;
  winddir?: number;
  windspeed: number;
}

export interface CurrentConditions {
  conditions: string;
  feelslike: number;
  humidity: number;
  icon?: string;
  pressure: number;
  temp: number;
  uvindex: number;
  visibility: number | null;
  windgust: number | null;
}

export interface WeatherData {
  currentConditions: CurrentConditions;
  days: WeatherDay[];
  resolvedAddress?: string;
}

export interface WeatherDay {
  conditions: string;
  datetime: string;
  hours: WeatherHour[];
  icon: string;
  precipprob: number;
  sunriseEpoch?: number;
  sunsetEpoch?: number;
  tempmax: number;
  tempmin: number;
  uvindex?: number;
}
