'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react'

const HealthCheck = ({ url, serviceName }) => {
  const [status, setStatus] = useState('loading') // 'loading', 'active', 'error'
  const [isChecking, setIsChecking] = useState(false)

  const checkHealth = async () => {
    setIsChecking(true)
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        setStatus('active')
        console.log(`✅ ${serviceName} health check successful`)
      } else {
        setStatus('error')
        console.warn(`⚠️ ${serviceName} health check failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error(`❌ Health check failed for ${serviceName}:`, error.message)
      setStatus('error')
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkHealth()
    // Verificar cada 30 segundos
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [url])

  const getStatusDisplay = () => {
    if (isChecking) {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Verificando...
          </div>
        </div>
      )
    }

    switch (status) {
      case 'active':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              Estado: Activo
            </div>
            <button
              onClick={checkHealth}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Verificar nuevamente"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        )
      case 'error':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-red-600">
              <XCircle className="h-4 w-4 mr-2" />
              Estado: Inactivo
            </div>
            <button
              onClick={checkHealth}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Reintentar"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verificando...
            </div>
          </div>
        )
    }
  }

  return (
    <div className="mt-2">
      {getStatusDisplay()}
    </div>
  )
}

export default HealthCheck
