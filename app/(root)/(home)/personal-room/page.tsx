'use client'

import { Button } from '@/components/ui/button'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

const Table = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-[#C9DDFF] lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-xl font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h1>
  </div>
)

const Personal = () => {
  const { user } = useUser()
  const client = useStreamVideoClient()
  const router =useRouter()
  const meetingID = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`

  const call = useGetCallById(meetingID || '')

  const StartRoom = useCallback(async () => {
    if(!client || !user) return
    const newcall=client.call('default',meetingID!)
    if (!call) {
      console.error('Call object not found')
      return
    }

    try {
      await newcall.getOrCreate({
        data: {
          starts_at: new Date().toISOString()
        },
      })
      console.log('Meeting started successfully')
    } catch (error) {
      console.error('Failed to start meeting:', error)
    }

    router.push(`/meeting/${meetingID}?personal=true`)
  }, [call, user?.username])

  return (
    <section className="flex flex-col size-full text-white gap-10">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic:"
          description={`${user?.username}'s Meeting Room`}
        />
        <Table title="Meeting ID:" description={meetingID || 'N/A'} />
        <Table title="Meeting Link:" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-[#0E78F9]" onClick={StartRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-[#252A41]"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default Personal
