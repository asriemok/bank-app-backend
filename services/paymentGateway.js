exports.simulatePayment = async (type, amount) => {
  // Simulate success/failure randomly
  const success = Math.random() > 0.1; // 90% success
  console.log(`Simulated ${type} of $${amount}: ${success ? "OK" : "FAILED"}`);
  return success;
};
