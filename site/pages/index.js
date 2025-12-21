import styles from '../styles/Home.module.css'

export default function Home({ workspaces }) {
  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {workspaces.map(ws => (
          <div key={ws.name} className={styles.card}>
            <div className={styles.title}>{ws.friendly_name}</div>
            <div className={styles.meta}>{ws.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
