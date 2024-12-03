export const  addAlert = (alert)=>{
    console.log("click");
    
    return (
         
            <div
              style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                padding: '10px 20px',
                borderRadius: '4px',
                backgroundColor: alert.type === 'error' ? '#ffebee' : '#e8f5e9',
                color: alert.type === 'error' ? '#c62828' : '#2e7d32',
                border: `1px solid ${alert.type === 'error' ? '#ef9a9a' : '#a5d6a7'}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'opacity 0.3s ease-in-out',
                opacity: alert ? 1 : 0,
              }}
            >
              {alert.message}
            </div>
          
      );
}

export const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };