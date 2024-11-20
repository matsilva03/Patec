import { Button, Fieldset, HStack } from '@chakra-ui/react'
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTrigger } from './ui/dialog'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Stack, Text } from '@chakra-ui/react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface HeaderProps {
  subject: string[]
}

const items = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
]

const formSchema = z.object({
  value: z.array(z.string({ message: 'Obrigatório' })),
})

type FormValues = z.infer<typeof formSchema>

const Answersheet: React.FC<HeaderProps> = ({ subject = [] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSucess, setIsSucess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [] },
  })

  const onSubmit = handleSubmit((data) => {
      const groupedData = subject.map((discipline, index) => {
        const disciplineAnswers = data.value.slice(index * 5, (index + 1) * 5);

        return [discipline, ...disciplineAnswers]
      })

      for (const disciplineData of groupedData) {
        const [discipline, ...answers] = disciplineData

        const payload = {
          answer1: answers[0],
          answer2: answers[1],
          answer3: answers[2],
          answer4: answers[3],
          answer5: answers[4],
          //user: userId,
          disciplina: discipline,
        }
        console.log(payload)
      }
 
    setIsDialogOpen(false)
    setIsSucess(true)
    alert('Formulário enviado com sucesso!')
  })

  const handleDialogClose = () => setIsDialogOpen(false)
  
  return (
    <form id="answersForm" onSubmit={onSubmit} className="flex flex-col gap-4 mx-auto w-[475px]">
      <Fieldset.Root invalid={!!errors.value}>
        {subject.map((element, subjectIndex) => (
          <div key={subjectIndex} className="mb-6">
            <div className="flex items-center justify-start m-2">
              <Stack>
                <Text fontWeight="bold" fontSize="lg">
                  {element}
                </Text>
              </Stack>
            </div>

            {Array.from({ length: 5 }).map((_, questionIndex) => (
              <div key={questionIndex} className="flex">
                <div className="flex items-center justify-center m-2">
                  <div className="mr-6">
                    <Fieldset.Legend>Questão {questionIndex + 1}</Fieldset.Legend>
                  </div>
                  <Controller
                    name={`value.${subjectIndex * 5 + questionIndex}`}
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value)
                        }}
                      >
                        <HStack gap="6">
                          {items.map((item) => (
                            <Radio key={item.value} value={item.value}>
                              {item.label}
                            </Radio>
                          ))}
                        </HStack>
                      </RadioGroup>
                    )}
                  />
                </div>

                {errors.value?.[subjectIndex * 5 + questionIndex]?.message && (
                  <div className="justify-end max-w-[150px]">
                    <Text color="red.500" fontSize="sm" mt={2}>
                      {errors.value[subjectIndex * 5 + questionIndex]?.message}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-center m-4">
          <DialogRoot open={isDialogOpen} onOpenChange={(e)=> setIsDialogOpen(e.open)}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600" variant="outline">
                Enviar respostas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader></DialogHeader>
              <DialogBody>
                <p>Deseja enviar suas respostas?</p>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button size="md" variant="outline" onClick={handleDialogClose}>
                    Cancelar
                  </Button>
                </DialogActionTrigger>
                <Button type="submit" form="answersForm" bg="black" color="white" w="75px" h="35px" onClick={handleDialogClose}>
                  Enviar
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </div>
      </Fieldset.Root>
    </form>
  )
}
export default Answersheet
