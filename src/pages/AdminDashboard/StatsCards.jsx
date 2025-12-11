function StatsCards({ products = [] }) {
  return (
    <div className="flex flex-wrap gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md flex-1 border-l-4 border-accent min-w-[200px]">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">Total Productos</p>
        <p className="text-4xl font-title font-bold text-primary mt-1">{products.length}</p>
      </div>
      {/* Aquí podrías agregar más tarjetas de estadísticas en el futuro */}
    </div>
  )
}

export default StatsCards