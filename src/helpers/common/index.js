const getUUID = () => (Date.now() + Math.random() * (10 ** 8)).toString(36);

export default getUUID;
