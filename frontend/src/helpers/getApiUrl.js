export default () => {
    const port = process.env.REACT_APP_API_PORT || 3000;
    return `http://localhost:${port}`;
}