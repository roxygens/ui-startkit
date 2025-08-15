import {Circle  } from 'lucide-react'
import { Button } from '@/components/ui/button'

function App() {
  return (
   <div className="flex items-center justify-center h-screen bg-foreground">
    <Button
      size="md"
      variant="link"
      icon={<Circle />}
      iconPosition="both"
      disabled
      
    >
      Button
    </Button>
  </div>
  )
}

export default App
