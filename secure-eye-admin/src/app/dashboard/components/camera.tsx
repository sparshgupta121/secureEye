import React, { useState } from 'react'
import { createPortal } from 'react-dom'

interface CameraData {
  id: string
  name: string
  location: string
  status: 'pending' | 'approved' | 'declined'
  addedBy: string
  dateAdded: string
}

const mockCameras: CameraData[] = [
  { id: 'CAM0001', name: 'Front Door Camera', location: '123 Main St', status: 'pending', addedBy: 'user@example.com', dateAdded: '2023-05-15' },
  { id: 'CAM0002', name: 'Backyard Camera', location: '456 Elm St', status: 'approved', addedBy: 'user2@example.com', dateAdded: '2023-05-16' },
  { id: 'CAM0003', name: 'Garage Camera', location: '789 Oak St', status: 'pending', addedBy: 'user3@example.com', dateAdded: '2023-05-17' },
  { id: 'CAM0004', name: 'Side Entrance Camera', location: '101 Pine St', status: 'approved', addedBy: 'user4@example.com', dateAdded: '2023-05-18' },
]

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'destructive' }> = ({ 
  children, 
  className = '', 
  variant = 'default', 
  ...props 
}) => {
  const baseStyle = 'px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  }
  
  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Badge: React.FC<{ children: React.ReactNode; variant: 'approved' | 'pending' }> = ({ children, variant }) => {
  const baseStyle = 'px-2 py-1 rounded-full text-xs font-semibold'
  const variantStyles = {
    approved: 'bg-green-500 text-white',
    pending: 'bg-yellow-500 text-white'
  }
  
  return (
    <span className={`${baseStyle} ${variantStyles[variant]}`}>
      {children}
    </span>
  )
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  )
}

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default function CamerasComponent() {
  const [cameras, setCameras] = useState<CameraData[]>(mockCameras)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null)

  const handleApprove = (id: string) => {
    setCameras(cameras.map(cam => 
      cam.id === id ? { ...cam, status: 'approved' } : cam
    ))
    setSelectedCamera(null)
  }

  const handleDecline = (id: string) => {
    setCameras(cameras.map(cam => 
      cam.id === id ? { ...cam, status: 'declined' } : cam
    ))
    setSelectedCamera(null)
  }

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cameras</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search cameras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">All Cameras</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Camera ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Added By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCameras.map((camera) => (
                <tr key={camera.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{camera.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camera.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camera.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camera.addedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camera.dateAdded}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={camera.status === 'approved' ? 'approved' : 'pending'}>
                      {camera.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" onClick={() => setSelectedCamera(camera)}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={!!selectedCamera} onClose={() => setSelectedCamera(null)}>
        {selectedCamera && (
          <div>
            <h2 className="text-xl font-bold mb-4">Camera Details: {selectedCamera.id}</h2>
            <div className="grid gap-4">
              <div>
                <span className="font-medium text-gray-400">Name:</span>
                <span className="ml-2">{selectedCamera.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-400">Location:</span>
                <span className="ml-2">{selectedCamera.location}</span>
              </div>
              <div>
                <span className="font-medium text-gray-400">Added By:</span>
                <span className="ml-2">{selectedCamera.addedBy}</span>
              </div>
              <div>
                <span className="font-medium text-gray-400">Date Added:</span>
                <span className="ml-2">{selectedCamera.dateAdded}</span>
              </div>
              <div>
                <span className="font-medium text-gray-400">Status:</span>
                <span className="ml-2">
                  <Badge variant={selectedCamera.status === 'approved' ? 'approved' : 'pending'}>
                    {selectedCamera.status}
                  </Badge>
                </span>
              </div>
            </div>
            {selectedCamera.status === 'pending' && (
              <div className="flex justify-end gap-4 mt-6">
                <Button onClick={() => handleApprove(selectedCamera.id)}>
                  Approve
                </Button>
                <Button variant="destructive" onClick={() => handleDecline(selectedCamera.id)}>
                  Decline
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}