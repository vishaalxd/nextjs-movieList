function Error({ statusCode }) {
    return (
      <p>
        {statusCode
          ? `An error ${500} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500
    return { statusCode }
  }
  
  export default Error