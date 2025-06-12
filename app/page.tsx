"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ExternalLink,
  Play,
  X,
  FileText,
  Database,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const TOTAL_DISPLAY_TIME = 1000; // ms, total time per keyword
const TYPING_SPEED = 70; // ms per character
const DELETING_SPEED = 30; // ms per character
const WORD_PAUSE = 900; // ms between words

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXggmmz3xS3vzUAvhRngwzj9i7rhFsYZ0yjCRA0dlBmYt6uCMdVbRpbeKUnBLV2cY/exec';

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const [demoData, setDemoData] = useState({
    businessNumber: "",
    companyName: "",
    evaluationDate: "",
  })

  const [valuationResult, setValuationResult] = useState({
    companyName: "",
    ceoName: "",
    businessNumber: "",
    businessStartDate: "",
    totalShares: "",
    totalAssets: "",
    totalLiabilities: "",
    netAssets: "",
    pricePerShare: "",
  })

  const [balanceSheetData, setBalanceSheetData] = useState({
    currentAssets: "",
    fixedAssets: "",
    totalAssets: "",
    currentLiabilities: "",
    longTermLiabilities: "",
    totalLiabilities: "",
    capital: "",
    retainedEarnings: "",
    totalEquity: "",
  })

  const [incomeStatementData, setIncomeStatementData] = useState({
    revenue: "",
    costOfSales: "",
    grossProfit: "",
    operatingExpenses: "",
    operatingIncome: "",
    netIncome: "",
  })

  const [currentStep, setCurrentStep] = useState("input") // "input", "balance", "income", "valuation"

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    inquiry: "",
  })

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [fade, setFade] = useState(false)
  const words = ["AI Agent가", "자동화가", "신규고객확보가", "문서자동분석이", "정보자동추출이", "각종증명서발급이", "세금신고·납부가", "자료수집·정리가", "급여·4대보험업무가", "CS 관리가"]

  const [remainingSlots, setRemainingSlots] = useState(100)

  const handleDemoInput = (field: string, value: string) => {
    setDemoData((prev) => ({ ...prev, [field]: value }))
  }

  const startValuationDemo = async () => {
    if (!demoData.businessNumber || !demoData.companyName || !demoData.evaluationDate) return

    setIsLoading(true)
    setLoadingStep(1)
    setLoadingProgress(0)
    setCurrentStep("balance")

    // Step 1: Fill Balance Sheet
    setTimeout(() => {
      setLoadingStep(2)
      setLoadingProgress(20)
      setBalanceSheetData({
        currentAssets: "2,500,000,000",
        fixedAssets: "2,500,000,000",
        totalAssets: "5,000,000,000",
        currentLiabilities: "800,000,000",
        longTermLiabilities: "1,200,000,000",
        totalLiabilities: "2,000,000,000",
        capital: "1,000,000,000",
        retainedEarnings: "2,000,000,000",
        totalEquity: "3,000,000,000",
      })
    }, 1000)

    // Step 2: Fill Income Statement
    setTimeout(() => {
      setLoadingStep(3)
      setLoadingProgress(40)
      setCurrentStep("income")
      setIncomeStatementData({
        revenue: "8,000,000,000",
        costOfSales: "4,800,000,000",
        grossProfit: "3,200,000,000",
        operatingExpenses: "2,400,000,000",
        operatingIncome: "800,000,000",
        netIncome: "600,000,000",
      })
    }, 2500)

    // Step 3: Start Valuation
    setTimeout(() => {
      setLoadingStep(4)
      setLoadingProgress(60)
      setCurrentStep("valuation")
      setValuationResult((prev) => ({
        ...prev,
        companyName: demoData.companyName,
        businessNumber: demoData.businessNumber,
      }))
    }, 4000)

    // Step 4: Continue with existing valuation steps
    setTimeout(() => {
      setLoadingStep(5)
      setLoadingProgress(75)
      setCurrentStep("valuation")
      setValuationResult((prev) => ({
        ...prev,
        ceoName: "김대표",
        businessStartDate: "2020.03.15",
        totalShares: "10,000주",
        totalAssets: balanceSheetData.totalAssets + "원",
      }))
    }, 5000)

    setTimeout(() => {
      setLoadingStep(6)
      setLoadingProgress(90)
      setValuationResult((prev) => ({
        ...prev,
        totalLiabilities: balanceSheetData.totalLiabilities + "원",
        netAssets: balanceSheetData.totalEquity + "원",
      }))
    }, 6000)

    setTimeout(() => {
      setLoadingStep(7)
      setLoadingProgress(100)
      setValuationResult((prev) => ({
        ...prev,
        pricePerShare: "300,000원",
      }))
      setIsLoading(false)
    }, 7000)
  }

  // 카운트다운 타이머
  useEffect(() => {
    const targetDate = new Date("2025-07-15T23:59:59").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 사전신청자 이름 롤링
  const applicants = [
    "김○○",
    "이○○",
    "박○○",
    "최○○",
    "정○○",
    "강○○",
    "조○○",
    "윤○○",
    "장○○",
    "임○○",
    "한○○",
    "오○○",
    "서○○",
    "신○○",
    "권○○",
    "황○○",
    "안○○",
    "송○○",
    "전○○",
    "홍○○",
    "고○○",
    "문○○",
    "양○○",
    "손○○",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert("사전신청이 완료되었습니다!");
        setRemainingSlots((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        alert(result.message || "오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];

    if (fade) {
      // After fade out, switch word and start typing
      timer = setTimeout(() => {
        setFade(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setCurrentText("");
        setIsDeleting(false);
      }, 200);
    } else if (isDeleting) {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, DELETING_SPEED);
      } else {
        // Fade out before next word
        setFade(true);
      }
    } else {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, TYPING_SPEED);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, WORD_PAUSE);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, fade]);

  return (
    <div className="min-h-screen">
      {/* Dark Hero Section */}
      <div className="bg-gray-900 text-white">
        {/* Announcement Banner */}
        <div className="bg-lime-400 text-black px-4 py-2 text-center text-sm font-medium relative">
          <span className="mr-2">⚡</span>
          비상장주식가치평가 Autofill
          <Link href="#form" className="ml-4 underline font-semibold">
            7월 15일까지 사전신청 →
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-black hover:bg-black/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">AXCEL</div>
                  <div className="text-2xl">📊</div>
                </Link>
              </div>

              {/* Navigation Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
                  <span>서비스소개</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
                  <span>파트너혜택</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
                  <span>사전예약절차</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300">
                  <span>회사소개</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="bg-white text-[#6C7CFF] border-[#6C7CFF] hover:bg-[#f5f7ff] rounded-xl px-6 py-2 text-base font-medium flex items-center"
                  onClick={() => {
                    const el = document.getElementById('demo-preview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="mr-2 h-4 w-4 text-[#6C7CFF]" />
                  미리보기
                </Button>
                <Button className="bg-[#6C7CFF] hover:bg-[#5a6be0] text-white rounded-xl px-6 py-2 text-base font-medium">
                  사전신청하기
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative overflow-hidden">
          {/* Background Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-900/20 to-transparent transform rotate-45 translate-y-48 -translate-x-48"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-900/20 to-transparent transform -rotate-12 translate-y-32 translate-x-32"></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-gray-700/30 to-transparent transform rotate-12"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              {/* Tagline above headline */}
              <div className="mb-4 text-base sm:text-lg text-gray-300 font-medium">
                세무사님만을 위한 AI 솔루션 AXCEL
              </div>
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="block">
                  <span className="relative z-10 align-middle h-[1.2em] inline-flex items-center">
                    <span
                      className={`inline-block align-middle relative font-mono font-extrabold text-white px-2 transition-all duration-300 ease-in-out ${fade ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                      style={{lineHeight: 1.2}}
                    >
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </span>
                    <span className="ml-2 align-middle">필요한</span>
                  </span>
                </span>
                <span className="block text-white">세무사님을 위해</span>
              </h1>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  variant="outline"
                  className="bg-white text-[#6C7CFF] border-[#6C7CFF] hover:bg-[#f5f7ff] rounded-xl px-6 py-2 text-base font-medium flex items-center"
                  onClick={() => {
                    const el = document.getElementById('demo-preview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="mr-2 h-4 w-4 text-[#6C7CFF]" />
                  미리보기
                </Button>
                <Button className="bg-[#6C7CFF] hover:bg-[#5a6be0] text-white rounded-xl px-6 py-2 text-base font-medium">
                  사전신청하기
                </Button>
              </div>
            </div>
          </div>

          {/* Applicants Rolling Banner */}
          <div className="bg-gray-800/30 py-4 overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {[...applicants, ...applicants].map((name, index) => (
                <span key={index} className="mx-8 text-gray-400 text-sm">
                  ✅ {name} 세무사님이 사전신청을 완료했습니다
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Light Sections Start Here */}
      <div className="bg-white">
        {/* Company Logos Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gray-600 font-medium">신뢰받는 파트너사들</p>
            </div>
            <div className="flex items-center justify-center space-x-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <span className="text-sm font-medium text-gray-700">한화생명</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded"></div>
                <span className="text-sm font-medium text-gray-700">현대해상</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-800 rounded"></div>
                <span className="text-sm font-medium text-gray-700">신한생명</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">KB손해보험</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                <span className="text-sm font-medium text-gray-700">법무법인</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Services Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">세무 전문가를 위한 AI 솔루션</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AI 전문가 팀이 구축하고 개선한 기술로, 세무업무의 정확성과 성능을 최고 수준으로 끌어올립니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Document Parse */}
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-20 bg-white rounded border-2 border-purple-300 flex items-center justify-center shadow-sm">
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="w-16 h-16 bg-gray-900 rounded flex items-center justify-center">
                        <div className="space-y-1">
                          <div className="w-8 h-1 bg-white rounded"></div>
                          <div className="w-6 h-1 bg-white rounded"></div>
                          <div className="w-10 h-1 bg-white rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-gray-900">문서 자동 분석</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    PDF, 스캔본, 이메일을 AI가 자동으로 분석하여 세무업무에 필요한 정보를 추출합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* (REMOVE ALL BUTTONS HERE) */}
                </CardContent>
              </Card>

              {/* Information Extract */}
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-20 bg-white rounded border-2 border-purple-300 flex flex-col items-center justify-center space-y-1 shadow-sm">
                        <div className="w-8 h-1 bg-purple-600 rounded"></div>
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div className="w-10 h-1 bg-orange-400 rounded"></div>
                      </div>
                      <div className="w-16 h-16 bg-gray-900 rounded flex items-center justify-center">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <Database className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-gray-900">정보 자동 추출</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    계약서, 영수증, 세금계산서에서 핵심 데이터를 정확하게 추출하여 구조화된 정보로 변환합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* (REMOVE ALL BUTTONS HERE) */}
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <div className="space-y-2">
                        <div className="w-8 h-8 bg-purple-600 rounded"></div>
                        <div className="w-6 h-6 bg-orange-400 rounded"></div>
                        <div className="w-10 h-10 bg-purple-800 rounded"></div>
                      </div>
                      <div className="w-24 h-16 bg-white rounded shadow-sm flex items-center justify-center p-2">
                        <div className="text-gray-900 text-xs text-center">
                          <div className="font-semibold">평가 완료</div>
                          <div className="text-gray-600">정확도 99.2%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-gray-900">Axcel AI</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    세무 전문 지식을 학습한 AI가 복잡한 세무 질문에 정확하고 신속하게 답변합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* (REMOVE ALL BUTTONS HERE) */}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">그 밖의 세무사님의 모든 업무를 자동화 </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                각 업무별 특성과 고객의 사업특성을 반영한 맞춤형 AI Agent를 개발합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tax Services */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-lg mb-6 mx-auto">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">세무 서비스</h3>
                  <p className="text-gray-700 text-center mb-6">
                    비상장주식가치평가, 세무신고, 세무상담 업무를 AI Agent로 자동화해보세요.
                  </p>
                </CardContent>
              </Card>

              {/* RPA Services */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-6 mx-auto">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">RPA 서비스</h3>
                  <p className="text-gray-700 text-center mb-6">
                    세금신고·납부, 자료수집·정리, 급여·4대보험업무, 증명서·각종문서발급, 고객CS 등 매일반복하는 업무를 자동화할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">왜 Axcel을 선택해야 할까요?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">반복되는 업무 자동화</h3>
                <p className="text-gray-600">
                  기존 대비 90% 시간 단축으로 직원 1명이 최대 100명의 고객을 효율적으로 관리할 수 있습니다.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">수익 다각화</h3>
                <p className="text-gray-600">절세, 상속증여, 가업승계 등의 고부가가치 컨설팅을 통해 수익을 다각화 할 수 있습니다.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">보고서 자동작성</h3>
                <p className="text-gray-600">금융권, 컨설팅펌 수준의 보고서 작성을 AXCEL이 지원합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Demo Section */}
        <section id="demo-preview" className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800">실시간 미리보기</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Axcel AI 실제 작동 모습</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                법인등록번호만 입력하면 복잡한 세무 업무가 자동으로 완성됩니다
              </p>
            </div>

            {/* Valuation Demo */}
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_4fr] gap-8">
                {/* Input Side */}
                <Card className="bg-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">법인 정보 입력</CardTitle>
                    <CardDescription>법인등록번호를 입력하면 자동으로 평가명세서가 작성됩니다</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">법인등록번호</label>
                      <Input
                        value={demoData.businessNumber}
                        onChange={(e) => handleDemoInput("businessNumber", e.target.value)}
                        placeholder="123456-1234567"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">법인명</label>
                      <Input
                        value={demoData.companyName}
                        onChange={(e) => handleDemoInput("companyName", e.target.value)}
                        placeholder="회사명을 입력하세요"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">평가기준일</label>
                      <Input
                        type="date"
                        value={demoData.evaluationDate}
                        onChange={(e) => handleDemoInput("evaluationDate", e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Button
                      onClick={startValuationDemo}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          재무정보 분석 중...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-5 w-5" />
                          재무정보 가져오기
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Output Side */}
                <Card className="bg-white shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">
                      {currentStep === "input" && "AI 분석 결과"}
                      {currentStep === "balance" && "재무상태표"}
                      {currentStep === "income" && "손익계산서"}
                      {currentStep === "valuation" && "비상장주식 평가명세서"}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === "input" && "재무정보 가져오기를 클릭하면 AI가 자동으로 분석을 시작합니다"}
                      {currentStep === "balance" && "AI가 자동으로 작성한 재무상태표"}
                      {currentStep === "income" && "AI가 자동으로 작성한 손익계산서"}
                      {currentStep === "valuation" && "AI가 자동으로 작성한 평가명세서"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-6 rounded-lg min-h-[500px] font-mono text-sm relative">
                      {isLoading && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                          <div className="mb-4 text-center">
                            {loadingStep === 1 && "재무정보 수집 중..."}
                            {loadingStep === 2 && "재무상태표 작성 중..."}
                            {loadingStep === 3 && "손익계산서 작성 중..."}
                            {loadingStep === 4 && "평가명세서 작성 시작..."}
                            {loadingStep === 5 && "기업 정보 확인 중..."}
                            {loadingStep === 6 && "순자산 가치 계산 중..."}
                            {loadingStep === 7 && "최종 평가액 계산 중..."}
                          </div>
                          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="bg-purple-500 h-full transition-all duration-500"
                              style={{ width: `${loadingProgress}%` }}
                            ></div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            {loadingStep > 2 && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {loadingStep > 3 && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {loadingStep > 4 && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {loadingStep > 5 && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {loadingStep > 6 && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                        </div>
                      )}

                      {/* Balance Sheet Display */}
                      {currentStep === "balance" && (
                        <div>
                          <div className="text-center font-bold text-lg mb-4 border-b pb-2">재무상태표</div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <div className="font-semibold mb-2 text-blue-600">자산</div>
                              <div className="space-y-1 text-xs">
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">유동자산</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.currentAssets ? "text-blue-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.currentAssets ? balanceSheetData.currentAssets + "원" : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">고정자산</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.fixedAssets ? "text-blue-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.fixedAssets ? balanceSheetData.fixedAssets + "원" : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-black font-semibold">
                                  <div className="p-1">자산총계</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.totalAssets ? "text-blue-600" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.totalAssets ? balanceSheetData.totalAssets + "원" : "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold mb-2 text-red-600">부채 및 자본</div>
                              <div className="space-y-1 text-xs">
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">유동부채</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.currentLiabilities ? "text-red-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.currentLiabilities
                                      ? balanceSheetData.currentLiabilities + "원"
                                      : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">고정부채</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.longTermLiabilities ? "text-red-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.longTermLiabilities
                                      ? balanceSheetData.longTermLiabilities + "원"
                                      : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">자본금</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.capital ? "text-green-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.capital ? balanceSheetData.capital + "원" : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b">
                                  <div className="p-1">이익잉여금</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.retainedEarnings ? "text-green-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.retainedEarnings ? balanceSheetData.retainedEarnings + "원" : "-"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border-b border-black font-semibold">
                                  <div className="p-1">부채 및 자본총계</div>
                                  <div
                                    className={`p-1 text-right ${balanceSheetData.totalEquity ? "text-green-600" : "text-gray-400"}`}
                                  >
                                    {balanceSheetData.totalAssets ? balanceSheetData.totalAssets + "원" : "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Income Statement Display */}
                      {currentStep === "income" && (
                        <div>
                          <div className="text-center font-bold text-lg mb-4 border-b pb-2">손익계산서</div>
                          <div className="space-y-2 text-xs">
                            <div className="grid grid-cols-2 border-b">
                              <div className="p-2 font-medium">매출액</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.revenue ? "text-blue-600 font-semibold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.revenue ? incomeStatementData.revenue + "원" : "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                              <div className="p-2 font-medium">매출원가</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.costOfSales ? "text-red-600 font-semibold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.costOfSales ? incomeStatementData.costOfSales + "원" : "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                              <div className="p-2 font-medium">매출총이익</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.grossProfit ? "text-green-600 font-semibold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.grossProfit ? incomeStatementData.grossProfit + "원" : "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                              <div className="p-2 font-medium">판매비와관리비</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.operatingExpenses ? "text-red-600 font-semibold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.operatingExpenses
                                  ? incomeStatementData.operatingExpenses + "원"
                                  : "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                              <div className="p-2 font-medium">영업이익</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.operatingIncome ? "text-green-600 font-semibold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.operatingIncome ? incomeStatementData.operatingIncome + "원" : "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 border-b border-black">
                              <div className="p-2 font-medium">당기순이익</div>
                              <div
                                className={`p-2 text-right ${incomeStatementData.netIncome ? "text-green-600 font-bold" : "text-gray-400"}`}
                              >
                                {incomeStatementData.netIncome ? incomeStatementData.netIncome + "원" : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Existing Valuation Statement Display */}
                      {currentStep === "valuation" && (
                        <div>
                          <div className="text-center font-bold text-lg mb-4 border-b pb-2">비상장주식 평가명세서</div>
                          <div className="space-y-4">
                            <div>
                              <div className="font-semibold mb-2">1. 평가대상 기업 일반정보</div>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="border p-2">
                                  <div className="font-medium">법인명</div>
                                  <div
                                    className={`transition-all duration-1000 ${valuationResult.companyName ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.companyName || "법인명"}
                                  </div>
                                </div>
                                <div className="border p-2">
                                  <div className="font-medium">대표자 성명</div>
                                  <div
                                    className={`transition-all duration-1000 ${valuationResult.ceoName ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.ceoName || "대표자 성명"}
                                  </div>
                                </div>
                                <div className="border p-2">
                                  <div className="font-medium">법인등록번호</div>
                                  <div
                                    className={`transition-all duration-1000 ${valuationResult.businessNumber ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.businessNumber || "법인등록번호"}
                                  </div>
                                </div>
                                <div className="border p-2">
                                  <div className="font-medium">사업개시일</div>
                                  <div
                                    className={`transition-all duration-1000 ${valuationResult.businessStartDate ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.businessStartDate || "사업개시일"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="font-semibold mb-2">2. 평가대상 기업 재무정보</div>
                              <div className="space-y-2 text-xs">
                                <div className="grid grid-cols-2 border">
                                  <div className="p-2 font-medium">발행주식 총수</div>
                                  <div
                                    className={`p-2 transition-all duration-1000 ${valuationResult.totalShares ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.totalShares || "발행주식 총수"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border">
                                  <div className="p-2 font-medium">자산총액(원)</div>
                                  <div
                                    className={`p-2 transition-all duration-1000 ${valuationResult.totalAssets ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.totalAssets || "자산총액"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border">
                                  <div className="p-2 font-medium">부채총액(원)</div>
                                  <div
                                    className={`p-2 transition-all duration-1000 ${valuationResult.totalLiabilities ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.totalLiabilities || "부채총액"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 border">
                                  <div className="p-2 font-medium">순자산가액(원)</div>
                                  <div
                                    className={`p-2 transition-all duration-1000 ${valuationResult.netAssets ? "text-purple-600 font-semibold" : "text-gray-400"}`}
                                  >
                                    {valuationResult.netAssets || "순자산가액"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="font-semibold mb-2">3. 비상장주식 1주당 평가액</div>
                              <div className="border p-2 text-center">
                                <div className="font-medium">1주당 평가액(원)</div>
                                <div
                                  className={`text-lg transition-all duration-1000 ${valuationResult.pricePerShare ? "text-purple-600 font-bold" : "text-gray-400"}`}
                                >
                                  {valuationResult.pricePerShare || "계산 결과"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {valuationResult.pricePerShare && (
                            <div className="mt-4 p-3 bg-green-100 rounded-lg">
                              <div className="flex items-center text-green-800">
                                <CheckCircle className="h-5 w-5 mr-2" />
                                <span className="font-semibold">평가 완료!</span>
                              </div>
                              <div className="text-sm text-green-700 mt-1">
                                AI가 자동으로 계산한 결과입니다. 기존 대비 95% 시간 단축!
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Default state */}
                      {currentStep === "input" && (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <div className="text-center">
                            <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>재무정보 가져오기를 클릭하면</p>
                            <p>AI가 자동으로 분석을 시작합니다</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Demo Stats */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">시간 단축</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.2%</div>
                <div className="text-gray-600">정확도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">자동 처리</div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Timer (replaced with 선착순 카운터) */}
        <section className="py-12 bg-gradient-to-r from-purple-100 to-purple-100 text-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold">사전신청 선착순 모집</h3>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white/80 backdrop-blur rounded-lg p-6 flex flex-col items-center">
                <div className="text-lg text-gray-700 mb-2">남은 신청 가능 인원</div>
                <div className="text-5xl font-bold text-purple-600 mb-2">{remainingSlots}명</div>
                <div className="text-gray-500 text-sm">총 100명 선착순 모집 · 마감 시 자동 종료</div>
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-6">놓치면 후회할 기회! 지금 바로 사전신청하세요</p>
            <Button size="lg" className="bg-[#6C7CFF] hover:bg-[#5a6be0] text-white font-semibold px-8 py-3 rounded-xl">
              지금 신청하기 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Pre-registration Form */}
        <section id="form" className="py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800">사전신청</Badge>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Axcel AI 사전신청</h2>
              <p className="text-xl text-gray-600">출시 전 특별 혜택을 받아보세요</p>
            </div>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="홍길동"
                      required
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">세무법인/세무사무소 이름</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="○○세무법인 또는 ○○세무사사무소"
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      휴대폰번호 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-1234-5678"
                      required
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      이메일주소 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      문의내용 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      placeholder="예시:
- 비상장주식가치평가 업무량이 많아 자동화가 필요합니다
- AI를 활용한 세무신고 자동화에 관심이 있습니다
- 고객 관리 및 신규 고객 확보 방안을 알고 싶습니다
- 기존 세무 프로그램과의 연동 가능 여부가 궁금합니다"
                      required
                      rows={6}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#6C7CFF] hover:bg-[#5a6be0] text-white font-semibold py-3 text-lg rounded-xl"
                  >
                    사전신청 완료하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
            <p className="text-xl text-gray-300 mb-8">AI 시대의 세무업무 혁신, Axcel과 함께하세요</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-[#6C7CFF] hover:bg-[#5a6be0] text-white px-8 py-3 rounded-xl font-semibold">
                무료 체험하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#6C7CFF] text-[#6C7CFF] bg-white hover:bg-[#f5f7ff] hover:text-[#5a6be0] px-8 py-3 rounded-xl font-semibold"
              >
                상담 예약하기
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-2xl font-bold text-gray-900">AXCEL</div>
                  <div className="text-2xl">📊</div>
                </div>
                <p className="text-gray-600 mb-6 max-w-md">
                  AI 기술로 세무업무를 혁신하여 세무사님들의 업무 효율성을 극대화하는 것이 저희의 목표입니다.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">서비스</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <Link href="#" className="hover:text-gray-900">
                      문서 자동 분석
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-900">
                      정보 자동 추출
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-900">
                      Axcel AI
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-900">
                      API 서비스
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">연락처</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    contact@axcel.ai
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    02-1234-5678
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    서울시 강남구 테헤란로
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">© 2025 AXCEL. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  개인정보처리방침
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  이용약관
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  쿠키정책
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
