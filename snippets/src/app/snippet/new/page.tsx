import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import React from 'react'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const CreateSnippetPage = () => {
  async function CreateSnippet(data: FormData){
    "use server"
    const title = data.get("title") as string;
    const code = data.get("code") as string;
    const snippet = await prisma.snippet.create({
      data: {
        title,
        code
      }
    }); 
    console.log("Created snippet:", snippet);
    redirect("/")
  }
  return (
    <form action={CreateSnippet}>
        <div>
            <Label>Title</Label>
            <Input type="text" name="title" id="title"/>
        </div>
          <div>
            <Label>Code</Label>
            <Textarea name="code" id="code"/>
        </div>
        <Button type="submit" className='mt-4'>New</Button>
    </form>
  )
}

export default CreateSnippetPage