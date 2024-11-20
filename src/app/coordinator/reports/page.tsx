"use client"
import { FaRegFilePdf } from "react-icons/fa6"
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react';
import { HiOutlineDocumentReport } from "react-icons/hi";

interface ReportByStudent {
  subjectId: string 
  subjectName: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  answer5: string
  score: number
}

export default function Home() {
  const [data] = useState<ReportByStudent[]>([
    { subjectId: 'ADM0000', subjectName: 'Administração', answer1: 'C', answer2: 'A', answer3: 'A', answer4: 'D', answer5: 'C', score: 6 },
    { subjectId: 'ECO0000', subjectName: 'Economia', answer1: 'C', answer2: 'C', answer3: 'A', answer4: 'B', answer5: 'D', score: 4 },
    { subjectId: 'GGT0000', subjectName: 'Gestão e Governança de Tecnologia da Informação', answer1: 'B', answer2: 'D', answer3: 'C', answer4: 'B', answer5: 'A', score: 8 },
  ])
/*
  const [returnedValue, setReturnedValue] = useState<string>('');
  const popupRef = useRef<Window | null>(null);

  const openPopup = () => {
    const popup = window.open(
      '/reports/select_student',
      'PopupWindow',
      'width=400,height=300,left=300,top=200'
    );
    popupRef.current = popup;
  };

  useEffect(() => {
    // Listener para receber mensagens do popup
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'POPUP_VALUE') {
        setReturnedValue(event.data.value);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);*/
/*<div className="p-8">
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Abrir Popup
      </button>

      {returnedValue && (
        <p className="mt-4">Valor recebido do popup: {returnedValue}</p>
      )}
    </div>*/
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-200 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-11/12 max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100"
      >
        {/* Botão de Retorno */}
        <Link href="/coordinator/dashboard" className="absolute left-8 top-8">
          <Button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1">
            <FaArrowLeft size={24} />
            Voltar
          </Button>
        </Link>

        <div className="flex flex-col items-center mb-12">
          <HiOutlineDocumentReport className="text-6xl text-yellow-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Relatório</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full" />
        </div>

        <Button className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105">
          <FaRegFilePdf />
          Gerar PDF
        </Button>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <p className="text-xl text-center">Nenhum aluno cadastrado.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col items-center bg-blue-50">
              <h2 className="font-semibold text-gray-700">Gestão Empresarial EaD</h2>
              <div className="flex items-center bg-blue-50">
                <h3 className="font-semibold text-gray-700">RA: </h3><h3 className="text-gray-600">1010101</h3>
              </div>
            </div>   
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="p-4 w-3/15 text-start text-lg font-semibold text-gray-700">Cód. Disciplina</th>
                  <th className="p-4 w-6/15 text-start text-lg font-semibold text-gray-700">Nome da Disciplina</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">R.1</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">R.2</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">R.3</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">R.4</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">R.5</th>
                  <th className="p-4 w-1/15 text-center text-lg font-semibold text-gray-700">Nota</th>
                </tr>
              </thead>
              <tbody>
                {data.map((relatorio, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-blue-50/50 transition-colors duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <td className="p-4 w-3/15 font-medium text-gray-700">{relatorio.subjectId}</td>
                    <td className="p-4 w-6/15 text-gray-600">{relatorio.subjectName}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.answer1}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.answer2}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.answer3}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.answer4}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.answer5}</td>
                    <td className="p-4 w-1/15 text-center text-gray-600">{relatorio.score}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}