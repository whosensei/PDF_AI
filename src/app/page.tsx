import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  MessageSquare,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default async function Home() {
  const { userId } = await auth()
  const isAuth = !!userId

  let firstChat
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId))
    if (firstChat) {
      firstChat = firstChat[0]
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-mistyblue/5 to-transparent opacity-70"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-mistyblue/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange/10 text-orange text-sm font-medium mb-6 animate-fade-in shadow-md">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>AI-Native Document Intelligence</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Chat with any PDF <br className="hidden md:block" />
              <span className="gradient-text">in real time</span>
            </h1>

            <p className="text-xl text-charcoal/80 max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              PromptPDF is an AI-native document assistant that helps students, researchers, and professionals instantly
              answer questions and understand complex documents.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {isAuth && firstChat ? (
                <Link href={`/chat/${firstChat.id}`}>
                  <Button className="bg-orange hover:bg-orange-light text-white rounded-md px-6 py-6 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    Go to Your Documents
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href={isAuth ? "/chat/1" : "/sign-up"}>
                  <Button className="bg-orange hover:bg-orange-light text-white rounded-md px-6 py-6 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    {isAuth ? "Go to Your Documents" : "Get Started for Free"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}

              <Link href={isAuth?"/upload":"#demo"}>
                <Button
                  variant="outline"
                  className="rounded-md px-6 py-6 text-lg border-charcoal/20 text-charcoal hover:bg-charcoal/5 hover:text-charcoal w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isAuth ? "Upload a PDF" : "See How It Works"}
                  
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Powerful Features</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            PromptPDF transforms how you interact with documents, making information retrieval and understanding
            effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <MessageSquare className="h-7 w-7 text-orange" />
            </div>
            <h3 className="text-xl font-medium mb-3">Natural Conversations</h3>
            <p className="text-charcoal/70">
              Chat with your documents using natural language. Ask questions, request summaries, or dive deep into
              specific sections.
            </p>
          </div>

          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-mistyblue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <Search className="h-7 w-7 text-mistyblue" />
            </div>
            <h3 className="text-xl font-medium mb-3">Semantic Search</h3>
            <p className="text-charcoal/70">
              Find exactly what you need with our advanced semantic search that understands context, not just keywords.
            </p>
          </div>

          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <BrainCircuit className="h-7 w-7 text-orange" />
            </div>
            <h3 className="text-xl font-medium mb-3">AI-Powered Insights</h3>
            <p className="text-charcoal/70">
              Extract key insights, identify patterns, and generate summaries automatically with our advanced AI.
            </p>
          </div>

          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-mistyblue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <Zap className="h-7 w-7 text-mistyblue" />
            </div>
            <h3 className="text-xl font-medium mb-3">Lightning Fast</h3>
            <p className="text-charcoal/70">
              Get instant responses to your questions, no matter how large or complex your documents are.
            </p>
          </div>

          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <FileText className="h-7 w-7 text-orange" />
            </div>
            <h3 className="text-xl font-medium mb-3">Multiple Documents</h3>
            <p className="text-charcoal/70">
              Upload and analyze multiple PDFs simultaneously, making connections across different sources.
            </p>
          </div>

          <div className="bg-offwhite p-8 rounded-xl hover:shadow-md transition-all duration-300 shadow-lg">
            <div className="bg-mistyblue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <BookOpen className="h-7 w-7 text-mistyblue" />
            </div>
            <h3 className="text-xl font-medium mb-3">Language Support</h3>
            <p className="text-charcoal/70">
            Work with documents in multiple languages seamlessly—translate, summarize, and query across language barriers with AI.
            </p>
          </div>
        </div>
      </section>

      <section id="use-cases" className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">See PromptPDF in Action</h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Upload any PDF and start chatting with it instantly. Our AI understands the content and context of your
              documents, providing accurate and relevant responses to your questions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-orange mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Research Papers</h3>
                  <p className="text-charcoal/70">
                    Extract key findings and methodologies from academic papers without reading every page.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-orange mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Legal Documents</h3>
                  <p className="text-charcoal/70">
                    Quickly understand complex legal language and extract important clauses and obligations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-orange mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium">Technical Documentation</h3>
                  <p className="text-charcoal/70">
                    Navigate complex technical manuals and find exactly what you need in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link href={isAuth ? "/" : "/sign-up"}>
                <Button className="bg-orange hover:bg-orange-light text-white rounded-md px-6 py-3">
                  {isAuth ? "Try It Now" : "Get Started Free"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/1.png?height=600&width=800"
                alt="PromptPDF Demo Interface"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="flex items-start mb-4">
                <div className="bg-orange/10 p-2 rounded-full mr-3">
                  <MessageSquare className="h-5 w-5 text-orange" />
                </div>
                <p className="text-sm font-medium">"What are the key findings in the discussion section?"</p>
              </div>
              <p className="text-sm text-charcoal/70">
                The AI instantly analyzes the document and provides a concise summary of the key findings.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Demo Section
      <section id="demo" className="section">
      <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">See PromptPDF in Action</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Experience how PromptPDF helps you interact with documents. Try out the demo below to see how it works.
          </p>
        </div>

        <DemoInterface />        
      </section> */}
    </>
  )
}
