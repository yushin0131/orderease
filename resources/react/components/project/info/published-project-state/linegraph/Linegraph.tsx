
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js'
import './Linegraph.css'

// 必要なチャート機能の登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type LinegraphProps = {
  labels: string[],     // グラフのラベル
  data: number[],       // グラフのデータ
  title?: string,       // グラフのタイトル
  subtitle: string,     // データセットのラベル
  lineColor?: string,   // 折れ線の色
}

const Linegraph: React.FC<LinegraphProps> = ({ labels, data, title, subtitle, lineColor = 'rgba(75,192,192,1)' }) => {
  // データの設定
  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: subtitle,
        data,
        fill: false,
        backgroundColor: lineColor,  // 折れ線の背景色（データポイントの色）
        borderColor: lineColor,      // 折れ線の色
        tension: 0.1
      }
    ]
  }

  // グラフのオプション設定
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 18  // ラベルの文字サイズを指定（px単位）
          }
        }
      },
    }
  }

  return (
    <div className="linegraph-container">
      {title && <div className="linegraph-title">{title}</div>}
      <Line  data={chartData} options={options} />
    </div>
  )
}

export default Linegraph
