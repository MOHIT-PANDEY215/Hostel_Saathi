'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const blockSchema = z.object({
  name: z.string().min(1, 'Block name required'),
  floors: z.coerce.number().min(1),
  roomsPerFloor: z.coerce.number().min(1),
  bedsPerRoom: z.coerce.number().min(1),
})

const hostelSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  blocks: z.array(blockSchema).min(1, 'At least one block required'),
})

type HostelForm = z.infer<typeof hostelSchema>

/* ------------------ COMPONENT ------------------ */

export function CreateHostelDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<HostelForm>({
    resolver: zodResolver(hostelSchema),
    defaultValues: {
      name: '',
      address: '',
      blocks: [],
    },
  })

  const { control, register, handleSubmit, formState } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  /* ------------------ HANDLER ------------------ */

  const onSubmit = async (data: HostelForm) => {
    console.log('FINAL PAYLOAD:', data)

    // 🔥 call your API here
    // await createHostelMutation(data)

    toast.success('Hostel created successfully!')
    setOpen(false)
  }

  /* ------------------ UI ------------------ */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Hostel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Hostel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hostel Name</Label>
              <Input {...register('name')} />
            </div>

            <div>
              <Label>Address</Label>
              <Input {...register('address')} />
            </div>
          </div>

          {/* BLOCKS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Blocks</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    name: '',
                    floors: 1,
                    roomsPerFloor: 1,
                    bedsPerRoom: 1,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Block
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">Block {index + 1}</p>
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-red-500"
                    onClick={() => remove(index)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Block Name (A/B/C)"
                    {...register(`blocks.${index}.name`)}
                  />

                  <Input
                    type="number"
                    placeholder="Floors"
                    {...register(`blocks.${index}.floors`)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Rooms per Floor"
                    {...register(`blocks.${index}.roomsPerFloor`)}
                  />

                  <Input
                    type="number"
                    placeholder="Beds per Room"
                    {...register(`blocks.${index}.bedsPerRoom`)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ERROR */}
          {formState.errors.blocks && (
            <p className="text-red-500 text-sm">
              {formState.errors.blocks.message}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create Hostel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}