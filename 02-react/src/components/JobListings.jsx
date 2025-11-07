import { JobCard } from './JobCard.jsx'

export function JobListings ({ jobs }) {
  return (
    <>
      <h2>Resultados de búsqueda</h2>

      <div className="jobs-listings">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />//le damos una key unica a cada JobCard para que React pueda identificar 
          // cada componente de manera unica
        ))}
      </div>
    </>
  )
}