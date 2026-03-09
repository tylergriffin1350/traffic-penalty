import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileText,
  Search,
} from "lucide-react";
import { AnimatedHeader } from "@/components/landing/animated-header";
import { AnimatedFooter } from "@/components/landing/animated-footer";
import {
  AnimatedSection,
  AnimatedHeader as AnimatedSectionHeader,
  AnimatedBadge,
  AnimatedTitle,
  AnimatedText,
} from "@/components/landing/animated-section";
import {
  AnimatedHero,
  AnimatedHeading,
  AnimatedSubtitle,
  AnimatedImage,
  AnimatedBackground,
} from "@/components/landing/animated-hero";
import {
  AnimatedCard,
  AnimatedFeature,
  AnimatedStep,
} from "@/components/landing/animated-card";
import {
  AnimatedButton,
  AnimatedCTA,
} from "@/components/landing/animated-button";
import { PenaltySearch } from "@/components/landing/penalty-search";
import { Card } from "@/components/ui/card";
import { AnimatedFAQ } from "@/components/landing/animated-faq";
import { AnimatedTestimonial } from "@/components/landing/animated-testimonial";

export default function LandingPage() {
  const testimonials = [
    {
      quote:
        "I received a speeding ticket while on vacation. Being able to pay it online without having to mail a check was incredibly convenient.",
      author: "Nahom Tesfaye",
      role: "Driver",
      index: 0,
    },
    {
      quote:
        "The process was so simple. I entered my reference number, confirmed the details, and paid in less than 2 minutes. Highly recommend!",
      author: "Mohhamed Awel",
      role: "Commuter",
      index: 1,
    },
    {
      quote:
        "As a delivery driver, I occasionally get parking tickets. This system makes it easy to handle them quickly so I can get back to work.",
      author: "Chala Jemal",
      role: "Delivery Driver",
      index: 2,
    },
  ];

  const faqs = [
    {
      question: "Where can I find my reference number?",
      answer:
        "Your reference number is located at the top of your traffic penalty notice. It typically starts with 'TRF-' followed by a series of numbers and letters.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit and debit cards, bank transfers, and digital wallets including PayPal, Apple Pay, and Google Pay.",
    },
    {
      question: "How quickly will my payment be processed?",
      answer:
        "Payments are processed immediately. You will receive a confirmation receipt that can be used as proof of payment.",
    },
    {
      question: "What if I believe the penalty was issued incorrectly?",
      answer:
        "If you wish to dispute a penalty, you should follow the appeal instructions provided on your penalty notice. This online system is for payments only.",
    },
    {
      question: "Is there a deadline for paying my penalty?",
      answer:
        "Yes, each penalty has a due date. Paying after this date may result in increased fines or additional legal consequences. The due date is shown on your penalty notice and will be displayed when you check your penalty details.",
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <AnimatedHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-6 md:py-12 lg:py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background overflow-hidden relative">
          <AnimatedBackground />
          <AnimatedHero>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <AnimatedHeading>
                    Pay Your Traffic Penalties Quickly & Easily
                  </AnimatedHeading>
                  <AnimatedSubtitle delay={0.6}>
                    Enter your reference number to check your traffic penalty
                    details and pay securely online.
                  </AnimatedSubtitle>
                </div>

                <AnimatedCTA>
                  <AnimatedButton size="lg" className="h-12">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton size="lg" variant="outline" className="h-12">
                    Learn More
                  </AnimatedButton>
                </AnimatedCTA>
              </div>

              <div className="flex flex-col gap-6">
                <AnimatedImage
                  src="/traffic-light.jpg"
                  alt="Traffic Penalty Payment"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </AnimatedHero>
        </section>

        {/* Penalty Search Section */}
        <AnimatedSection className="w-full py-12 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 -mt-24 -ml-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSectionHeader>
              <div className="space-y-2">
                <AnimatedBadge>Quick Search</AnimatedBadge>
                <AnimatedTitle>Check & Pay Your Penalty</AnimatedTitle>
                <AnimatedText>
                  Enter your reference number to check your traffic penalty
                  details and pay securely online.
                </AnimatedText>
              </div>
            </AnimatedSectionHeader>

            <div className="mx-auto max-w-3xl mt-8">
              <AnimatedCard>
                <Card className="p-6 shadow-xl border-muted/50 bg-background">
                  <PenaltySearch />
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* How It Works Section */}
        <AnimatedSection
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSectionHeader>
              <div className="space-y-2">
                <AnimatedBadge>How It Works</AnimatedBadge>
                <AnimatedTitle>Simple 3-Step Process</AnimatedTitle>
                <AnimatedText>
                  Paying your traffic penalty is quick and easy with our secure
                  online system.
                </AnimatedText>
              </div>
            </AnimatedSectionHeader>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <Search className="h-10 w-10" />,
                  title: "Enter Reference Number",
                  description:
                    "Enter the reference number from your traffic penalty notice.",
                },
                {
                  icon: <FileText className="h-10 w-10" />,
                  title: "Review Details",
                  description:
                    "Check the penalty details including amount, due date, and violation type.",
                },
                {
                  icon: <CreditCard className="h-10 w-10" />,
                  title: "Make Payment",
                  description:
                    "Pay securely using your preferred payment method and get instant confirmation.",
                },
              ].map((step, index) => (
                <AnimatedStep
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={0.2 * index}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-24 -mr-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSectionHeader>
              <div className="space-y-2">
                <AnimatedBadge>Benefits</AnimatedBadge>
                <AnimatedTitle>Why Use This Platform?</AnimatedTitle>
                <AnimatedText>
                  Our platform makes paying traffic penalties simple, secure,
                  and stress-free.
                </AnimatedText>
              </div>
            </AnimatedSectionHeader>

            <div className="mx-auto max-w-3xl mt-12">
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    icon: <CheckCircle className="h-5 w-5" />,
                    title: "Quick & Easy",
                    description:
                      "Pay your penalty in under 2 minutes with our streamlined process.",
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5" />,
                    title: "Secure Payments",
                    description:
                      "Your payment information is protected with bank-level security.",
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5" />,
                    title: "Instant Confirmation",
                    description:
                      "Receive immediate confirmation and receipt of your payment.",
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5" />,
                    title: "Available 24/7",
                    description:
                      "Pay your penalties anytime, anywhere, from any device.",
                  },
                ].map((feature, index) => (
                  <AnimatedFeature
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSectionHeader>
              <div className="space-y-2">
                <AnimatedBadge>Testimonials</AnimatedBadge>
                <AnimatedTitle>What Drivers Say</AnimatedTitle>
                <AnimatedText>
                  Hear from drivers who have used our platform to pay their
                  traffic penalties.
                </AnimatedText>
              </div>
            </AnimatedSectionHeader>

            <AnimatedTestimonial testimonials={testimonials} />
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-24 -mr-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSectionHeader>
              <div className="space-y-2">
                <AnimatedBadge>FAQ</AnimatedBadge>
                <AnimatedTitle>Common Questions</AnimatedTitle>
                <AnimatedText>
                  Find answers to frequently asked questions about paying
                  traffic penalties.
                </AnimatedText>
              </div>
            </AnimatedSectionHeader>

            <AnimatedFAQ faqs={faqs} />
          </div>
        </AnimatedSection>
      </main>

      <AnimatedFooter />
    </div>
  );
}
