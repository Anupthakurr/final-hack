

const dashboard = (req, res) => {
    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    // Function to generate and send health data
    const sendData = () => {
      // Simulate realistic human data
      const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Resting heart rate (60–100 BPM)
      const oxygenSaturation = (Math.random() * (100 - 95) + 95).toFixed(1); // Normal SpO2 (95–100%)
      const steps = Math.floor(Math.random() * 200); // Steps per minute (0–200 steps)
      const timestamp = new Date().toISOString();
      
      const healthData = {
        heart_rate: heartRate,
        oxygen_saturation: oxygenSaturation,
        steps: steps,
        timestamp: timestamp,
      };
      
      // Format for Server-Sent Events
      res.write(`data: ${JSON.stringify(healthData)}\n\n`);
    };
  
    // Send initial data immediately
    sendData();
    
    // Send data every 2.5 seconds
    const interval = setInterval(sendData, 2500);
    
    // Clean up when client disconnects
    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  };
  export default dashboard
  
 