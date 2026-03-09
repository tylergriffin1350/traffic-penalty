"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  CreditCard,
  Building,
  Wallet,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Car,
  Landmark, // Added for bank icons if needed, or use Building
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";

interface PenaltyDetails {
  referenceNumber: string;
  vehicleInfo: string;
  type: string;
  date: string;
  location: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
}

// Define a type for wallet providers for better structure
interface WalletProvider {
  id: string;
  name: string;
  //   icon?: JSX.Element; // Optional: if you want to add icons later
}

export function PenaltySearch() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [penaltyDetails, setPenaltyDetails] = useState<PenaltyDetails | null>(
    null
  );
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState("cbe"); // Default selected bank
  const [selectedWallet, setSelectedWallet] = useState("ebirr"); // Default selected wallet

  const handleSearch = () => {
    if (!referenceNumber.trim()) return;
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setPenaltyDetails({
        referenceNumber: referenceNumber,
        vehicleInfo: "Toyota Camry (ABC-123)",
        type: "Speeding Violation",
        date: "May 5, 2025",
        location: "Main Street, Addis Ababa",
        amount: 150.0,
        dueDate: "June 5, 2025",
        status: "Unpaid",
      });
      setIsSearching(false);
      setShowResults(true);
      setPaymentSuccess(false); // Reset payment success message on new search
    }, 1000);
  };

  const handlePayment = () => {
    if (!penaltyDetails) return;
    setIsProcessingPayment(true);
    // Simulate payment processing
    setTimeout(() => {
      setPenaltyDetails({
        ...penaltyDetails,
        status: "Paid",
      });
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      // Reset payment success message after 5 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 5000);
    }, 3500);
  };

  const bankOptions = [
    { id: "cbe", name: "Commercial Bank of Ethiopia (CBE)" },
    { id: "boa", name: "Bank of Abyssinia (BOA)" },
    { id: "oromia", name: "Oromia Bank" },
    { id: "awash", name: "Awash Bank" },
  ];

  const walletProviders: WalletProvider[] = [
    { id: "ebirr", name: "e-Birr" },
    { id: "telebirr", name: "teleBirr" },
    { id: "cbebirr", name: "CBE Birr" },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4 md:p-0">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <Input
            placeholder="Enter your penalty reference number"
            className="pl-10 h-12 bg-background/80 backdrop-blur border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-lg text-base"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        </div>
        <motion.button
          className="w-full h-12 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center"
          onClick={handleSearch}
          disabled={isSearching}
          whileHover={{ scale: isSearching ? 1 : 1.02 }}
          whileTap={{ scale: isSearching ? 1 : 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {isSearching ? (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  ease: "linear",
                }}
                className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              />
              <span>Searching...</span>
            </motion.div>
          ) : (
            "Check Penalty"
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showResults && penaltyDetails && (
          <motion.div
            className="space-y-6 mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="overflow-hidden border-muted/50 shadow-lg rounded-xl">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span>Traffic Penalty</span>
                  {penaltyDetails.status === "Unpaid" ? (
                    <motion.span
                      className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Unpaid
                    </motion.span>
                  ) : (
                    <motion.span
                      className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Paid
                    </motion.span>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  Reference: {penaltyDetails.referenceNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <motion.div
                  className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Car className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-base">
                      {penaltyDetails.vehicleInfo}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vehicle Details
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Violation Type",
                      value: penaltyDetails.type,
                      delay: 0.1,
                    },
                    {
                      label: "Fine Amount",
                      value: `ETB ${penaltyDetails.amount.toFixed(2)}`, // Changed $ to ETB
                      delay: 0.2,
                      isLarge: true,
                    },
                    {
                      label: "Issue Date",
                      value: penaltyDetails.date,
                      icon: (
                        <Calendar className="h-4 w-4 text-primary mr-1.5" />
                      ),
                      delay: 0.3,
                    },
                    {
                      label: "Due Date",
                      value: penaltyDetails.dueDate,
                      icon: <Clock className="h-4 w-4 text-primary mr-1.5" />,
                      delay: 0.4,
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      className="bg-background p-3 rounded-lg border"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: item.delay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <h4 className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center">
                        {item.icon} {item.label}
                      </h4>
                      <p
                        className={`font-medium ${
                          item.isLarge ? "text-xl text-primary" : "text-sm"
                        }`}
                      >
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="bg-background p-3 rounded-lg border"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h4 className="text-xs font-medium text-muted-foreground mb-0.5">
                    Location
                  </h4>
                  <p className="text-sm">{penaltyDetails.location}</p>
                </motion.div>

                {penaltyDetails.status === "Unpaid" && (
                  <motion.div
                    className="flex items-start gap-2.5 bg-amber-50 p-3.5 rounded-lg border border-amber-300 text-amber-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Please pay by the due date to avoid additional charges or
                      legal consequences.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <AnimatePresence>
              {penaltyDetails.status === "Paid" &&
                paymentSuccess && ( // Show receipt only when payment is successful
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="bg-green-50 border-green-200 overflow-hidden shadow-lg rounded-xl">
                      <CardHeader className="bg-green-100/70 rounded-t-xl">
                        <CardTitle className="flex items-center gap-2 text-green-800 text-lg">
                          <CheckCircle className="h-5 w-5" />
                          <span>Payment Receipt</span>
                        </CardTitle>
                        <CardDescription className="text-green-700 text-xs">
                          Transaction ID: TRX-
                          {Math.floor(Math.random() * 1000000)
                            .toString()
                            .padStart(6, "0")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="text-xs font-medium text-green-700 mb-0.5">
                              Amount Paid
                            </h4>
                            <p className="font-semibold text-green-800 text-lg">
                              ETB {penaltyDetails.amount.toFixed(2)}{" "}
                              {/* Changed $ to ETB */}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-green-700 mb-0.5">
                              Payment Date
                            </h4>
                            <p className="font-medium text-green-800">
                              {new Date().toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-green-700 mb-0.5">
                            Payment Method
                          </h4>
                          <p className="text-sm text-green-800">
                            Processed (e.g. Card/Wallet)
                          </p>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 rounded-md border border-green-200 shadow-sm">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-green-700">
                            Your payment has been processed successfully. This
                            receipt serves as proof of payment.
                          </p>
                        </div>
                        <motion.button
                          className="mt-2 w-full border border-green-500 text-green-700 hover:bg-green-100 rounded-md py-2.5 font-medium text-sm transition-colors"
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(237, 253, 243, 1)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          Download Receipt
                        </motion.button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {penaltyDetails.status === "Unpaid" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="overflow-hidden border-muted/50 shadow-lg rounded-xl">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Payment Options</CardTitle>
                      <CardDescription className="text-sm">
                        Choose your preferred payment method
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6 h-11">
                          <TabsTrigger
                            value="card"
                            className="text-xs sm:text-sm flex items-center gap-1.5 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                          >
                            <CreditCard className="h-4 w-4" /> Card
                          </TabsTrigger>
                          <TabsTrigger
                            value="bank"
                            className="text-xs sm:text-sm flex items-center gap-1.5 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                          >
                            <Building className="h-4 w-4" /> Bank
                          </TabsTrigger>
                          <TabsTrigger
                            value="wallet"
                            className="text-xs sm:text-sm flex items-center gap-1.5 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                          >
                            <Wallet className="h-4 w-4" /> Wallet
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card" className="space-y-4">
                          <div className="grid gap-1.5">
                            <Label htmlFor="card-number" className="text-xs">
                              Card Number
                            </Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className="h-10"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1.5">
                              <Label htmlFor="expiry" className="text-xs">
                                Expiry Date
                              </Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                className="h-10"
                              />
                            </div>
                            <div className="grid gap-1.5">
                              <Label htmlFor="cvc" className="text-xs">
                                CVC
                              </Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                className="h-10"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="bank" className="space-y-4">
                          <Label className="text-sm font-medium">
                            Select Bank
                          </Label>
                          <RadioGroup
                            defaultValue={selectedBank}
                            onValueChange={setSelectedBank}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                          >
                            {bankOptions.map((bank) => (
                              <div key={bank.id}>
                                <RadioGroupItem
                                  value={bank.id}
                                  id={bank.id}
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor={bank.id}
                                  className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all hover:bg-accent/50
                                    ${
                                      selectedBank === bank.id
                                        ? "border-primary ring-1 ring-primary bg-primary/5"
                                        : "border-muted"
                                    }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                      selectedBank === bank.id
                                        ? "border-primary bg-primary"
                                        : "border-muted-foreground"
                                    }`}
                                  >
                                    {selectedBank === bank.id && (
                                      <CheckCircle className="h-2.5 w-2.5 text-primary-foreground" />
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {bank.name}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <div className="mt-4 rounded-md border p-4 bg-muted/30">
                            <p className="text-xs text-muted-foreground mb-2">
                              Make a transfer to the following account details
                              using your selected bank:
                            </p>
                            <div className="space-y-1 text-xs">
                              <p>
                                <span className="font-medium text-foreground">
                                  Account Name:
                                </span>{" "}
                                Traffic Authority Payments
                              </p>
                              <p>
                                <span className="font-medium text-foreground">
                                  Account Number:
                                </span>{" "}
                                1000123456789 (Sample)
                              </p>
                              <p>
                                <span className="font-medium text-foreground">
                                  Reference:
                                </span>{" "}
                                {penaltyDetails.referenceNumber}
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="wallet" className="space-y-4">
                          <Label className="text-sm font-medium">
                            Select Wallet Provider
                          </Label>
                          <RadioGroup
                            defaultValue={selectedWallet}
                            onValueChange={setSelectedWallet}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                          >
                            {walletProviders.map((provider) => (
                              <div key={provider.id}>
                                <RadioGroupItem
                                  value={provider.id}
                                  id={provider.id}
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor={provider.id}
                                  className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md
                                    ${
                                      selectedWallet === provider.id
                                        ? "border-primary ring-2 ring-primary bg-primary/5"
                                        : "border-muted hover:border-primary/30"
                                    }`}
                                >
                                  {/* Placeholder for potential icon */}
                                  {/* <Wallet className={`h-8 w-8 mb-2 ${selectedWallet === provider.id ? 'text-primary' : 'text-muted-foreground'}`} /> */}
                                  <span
                                    className={`text-sm font-semibold ${
                                      selectedWallet === provider.id
                                        ? "text-primary"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {provider.name}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-xs text-muted-foreground pt-2">
                            You will be redirected to the selected payment
                            provider to complete your payment securely.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-6 border-t">
                      <motion.button
                        className="w-full h-12 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center"
                        onClick={handlePayment}
                        disabled={isProcessingPayment} // MODIFIED: Only disabled if processing
                        whileHover={{
                          scale: isProcessingPayment ? 1 : 1.02,
                        }}
                        whileTap={{
                          scale: isProcessingPayment ? 1 : 0.98,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {isProcessingPayment ? (
                          <motion.div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                            />
                            <span>Processing...</span>
                          </motion.div>
                        ) : (
                          `Pay ETB ${penaltyDetails.amount.toFixed(2)}`
                        )}
                      </motion.button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-muted-foreground text-center pt-4">
        <p>
          Example penalty reference format: CHE-12345-ABC (as shown on your
          penalty notice)
        </p>
        <p className="mt-1">
          For assistance, please contact support at
          support@trafficauthority.gov.et
        </p>
      </div>
    </div>
  );
}
