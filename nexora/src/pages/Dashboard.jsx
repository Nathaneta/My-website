import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboard } from '../store/dashboardSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import KPICard from '../components/DashboardWidgets/KPICard'
import ChartWidget from '../components/DashboardWidgets/ChartWidget'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((s) => s.dashboard)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  return (
    <div className="px-6 py-10 lg:px-10 space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {data && (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.kpis?.map((k) => (
              <KPICard key={k.label} label={k.label} value={k.value} trend={k.trend} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ChartWidget data={data.chart || []} />
            <ChartWidget data={data.chart || []} />
          </div>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  )}

