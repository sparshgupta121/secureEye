"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Plus, Edit2, Trash2, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "../../components/ui/dashboard-components"

interface Camera {
  id: number
  name: string
  number: number
  companyName: string
  type: string
  model: string
  serialNo: string
  range: string
  location: string
  sharing: boolean
  isVerified: boolean
}

export default function UserDashboard() {
  const router = useRouter()
  
  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: 1,
      name: "Front Door Camera",
      number: 1,
      companyName: "SecureTech",
      type: "Private",
      model: "ST-100",
      serialNo: "ST12345",
      range: "50m",
      location: "123 Main St",
      sharing: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Back Yard Camera",
      number: 2,
      companyName: "SafeView",
      type: "Private",
      model: "SV-200",
      serialNo: "SV67890",
      range: "30m",
      location: "123 Main St",
      sharing: false,
      isVerified: false,
    },
    {
      id: 3,
      name: "Shop Entrance",
      number: 3,
      companyName: "CityWatch",
      type: "Public",
      model: "CW-300",
      serialNo: "CW11111",
      range: "100m",
      location: "456 Market St",
      sharing: true,
      isVerified: true,
    },
  ])

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)

  const handleUpdateCamera = (updatedCamera: Camera) => {
    setCameras(cameras.map((camera) => (camera.id === updatedCamera.id ? updatedCamera : camera)))
    setSelectedCamera(null)
  }

  const handleDeleteCamera = (id: number) => {
    setCameras(cameras.filter(camera => camera.id !== id))
  }

  const handleEditCamera = (camera: Camera) => {
    setSelectedCamera(camera)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 md:mb-0">
            CCTV Camera Dashboard
          </h1>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button
              onClick={() => router.push("/camera/form")}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Camera
            </Button>
            <Button
              onClick={() => router.push("/subsidy-form")}
              variant="outline"
              className="w-full md:w-auto text-blue-300 border-blue-400 hover:bg-blue-900/50 hover:text-blue-200 transition-all duration-300"
            >
              Apply for Subsidy
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cameras.map((camera) => (
            <Card
              key={camera.id}
              className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-300">{camera.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {camera.type} Camera - {camera.companyName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="text-gray-400">Location:</span> {camera.location}
                  </p>
                  <p>
                    <span className="text-gray-400">Model:</span> {camera.model}
                  </p>
                  <p>
                    <span className="text-gray-400">Range:</span> {camera.range}
                  </p>
                  <div className="flex items-center">
                    <p className="mr-2">Sharing:</p>
                    {camera.sharing ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <p className="mr-2">Verified:</p>
                    {camera.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCamera(camera)}
                      className="w-full sm:w-auto text-blue-300 border-blue-400 hover:bg-blue-900/50 hover:text-blue-200 transition-all duration-300"
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-gray-100 border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold text-blue-300">
                        Camera Details
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        View and update camera information
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCamera && (
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right text-gray-400">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={selectedCamera.name}
                            onChange={(e) =>
                              setSelectedCamera({
                                ...selectedCamera,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3 bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right text-gray-400">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={selectedCamera.location}
                            onChange={(e) =>
                              setSelectedCamera({
                                ...selectedCamera,
                                location: e.target.value,
                              })
                            }
                            className="col-span-3 bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right text-gray-400">
                            Type
                          </Label>
                          <Select
                            value={selectedCamera.type}
                            onValueChange={(value) =>
                              setSelectedCamera({
                                ...selectedCamera,
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400">
                              <SelectValue placeholder="Select camera type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Private">Private</SelectItem>
                              <SelectItem value="Public">Public</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="sharing" className="text-right text-gray-400">
                            Sharing
                          </Label>
                          <Switch
                            id="sharing"
                            checked={selectedCamera.sharing}
                            onCheckedChange={(checked) =>
                              setSelectedCamera({
                                ...selectedCamera,
                                sharing: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end space-x-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCamera(null)}
                        className="text-gray-300 border-gray-500 hover:bg-gray-700/50 hover:text-gray-100"
                      >
                        Cancel
                      </Button>
                      {selectedCamera && (
                        <Button
                          onClick={() => handleUpdateCamera(selectedCamera)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Update Camera
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex justify-between w-full sm:w-auto space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => camera && handleEditCamera(camera)}
                    className="flex-1 sm:flex-initial text-yellow-300 border-yellow-400 hover:bg-yellow-900/50 hover:text-yellow-200 transition-all duration-300"
                  >
                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCamera(camera.id)}
                    className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {cameras.length === 0 && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-300 text-2xl">
                <AlertCircle className="mr-2 h-6 w-6" />
                No Cameras Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                You haven't added any cameras yet. Click the "Add New Camera" button to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}