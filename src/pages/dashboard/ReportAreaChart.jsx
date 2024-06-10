import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import api from 'api';

// chart options
const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2024-01-15T00:00:00.000Z',
      '2024-02-15T00:00:00.000Z',
      '2024-03-15T00:00:00.000Z',
      '2024-04-15T00:00:00.000Z',
      '2024-05-15T00:00:00.000Z',
      '2024-06-15T00:00:00.000Z',
      '2024-07-15T01:30:00.000Z',
      '2024-08-15T02:30:00.000Z',
      '2024-09-15T03:30:00.000Z',
      '2024-10-15T04:30:00.000Z',
      '2024-11-15T05:30:00.000Z',
      '2024-12-15T06:30:00.000Z'
    ],
    labels: {
      format: 'MMM'
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  tooltip: {
    x: {
      format: 'MM'
    }
  }
};

// ==============================|| REPORT AREA CHART ||============================== //

export default function ReportAreaChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  const [series, setSeries] = useState([
    {
      name: 'Average Risk Detected',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]);

  useEffect(() => {
    api.dashboard.getAveragePriorityPerMonth().then((response) => {
      if (response.status === 200) {
        console.log(response.data.monthlyPriorities);
        setSeries([
          {
            name: 'Average Risk Detected',
            data: response.data?.monthlyPriorities ?? []
          }
        ]);
      }
    });
  }, []);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, theme]);

  return <ReactApexChart options={options} series={series} type="line" height={340} />;
}
