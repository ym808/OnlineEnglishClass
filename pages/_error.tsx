function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 16px' }}>
      <p style={{ fontSize: '3rem', fontWeight: 700, color: '#2563EB' }}>{statusCode}</p>
      <p style={{ marginTop: '16px', color: '#64748B' }}>
        {statusCode === 404 ? '페이지를 찾을 수 없습니다.' : '오류가 발생했습니다.'}
      </p>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: { res?: { statusCode: number }; err?: { statusCode: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
