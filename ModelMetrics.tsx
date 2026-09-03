import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { ModelMetrics as ModelMetricsType } from '../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ModelMetricsProps {
  metrics: ModelMetricsType | null;
}

const MetricCard: React.FC<{ title: string; value: number; description: string }> = ({ 
  title, 
  value, 
  description 
}) => {
  const percentage = Math.round(value * 100);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-1 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{percentage}%</p>
      </div>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
};

const ModelMetrics: React.FC<ModelMetricsProps> = ({ metrics }) => {
  if (!metrics) return null;
  
  const chartData = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
    datasets: [
      {
        label: 'Model Performance',
        data: [
          metrics.accuracy * 100,
          metrics.precision * 100,
          metrics.recall * 100,
          metrics.f1 * 100
        ],
        backgroundColor: [
          'rgba(79, 70, 229, 0.6)',
          'rgba(13, 148, 136, 0.6)',
          'rgba(249, 115, 22, 0.6)',
          'rgba(139, 92, 246, 0.6)'
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(13, 148, 136)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Model Performance</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Accuracy" 
          value={metrics.accuracy} 
          description="Percentage of correct predictions"
        />
        <MetricCard 
          title="Precision" 
          value={metrics.precision} 
          description="True positives / (True + False positives)"
        />
        <MetricCard 
          title="Recall" 
          value={metrics.recall} 
          description="True positives / (True positives + False negatives)"
        />
        <MetricCard 
          title="F1 Score" 
          value={metrics.f1} 
          description="Harmonic mean of precision and recall"
        />
      </div>
      
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="mt-4 text-sm text-gray-600 bg-indigo-50 p-3 rounded-md">
        <p>
          <span className="font-medium">About these metrics:</span> The model has been trained on the SMS Spam Collection Dataset.
          These metrics show how well the model performs on test data not seen during training.
          Higher values indicate better performance.
        </p>
      </div>
    </div>
  );
};

export default ModelMetrics;