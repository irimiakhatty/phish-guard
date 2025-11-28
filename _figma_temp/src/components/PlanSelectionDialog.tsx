import { useState } from 'react';
import { Check, CreditCard, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useLanguage } from '../lib/LanguageContext';

interface PlanSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  planPeriod: string;
}

export function PlanSelectionDialog({ 
  isOpen, 
  onClose, 
  planName, 
  planPrice,
  planPeriod 
}: PlanSelectionDialogProps) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'details') {
      setStep('payment');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    
    // Close dialog after 2 seconds
    setTimeout(() => {
      onClose();
      setStep('details');
      setEmail('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
    }, 2000);
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setTimeout(() => {
        setStep('details');
        setEmail('');
        setCardNumber('');
        setCardExpiry('');
        setCardCvc('');
      }, 200);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-gray-700">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                {t.planDialog?.confirmPlan || 'Confirmă abonamentul'}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {t.planDialog?.subscribeTo || 'Te abonezi la'} {planName} - {planPrice}/{planPeriod}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">
                  {t.planDialog?.email || 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nume@exemplu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white mb-1">
                      {t.planDialog?.trialIncluded || 'Include 14 zile trial gratuit'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t.planDialog?.noChargeNow || 'Nu vei fi taxat acum. Poți anula oricând în primele 14 zile.'}
                    </p>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {t.planDialog?.continue || 'Continuă'}
              </Button>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="dark:text-white">
                {t.planDialog?.paymentDetails || 'Detalii plată'}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {t.planDialog?.securePayment || 'Plata ta este securizată și criptată'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="dark:text-gray-200">
                  {t.planDialog?.cardNumber || 'Număr card'}
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  maxLength={19}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="dark:text-gray-200">
                    {t.planDialog?.expiry || 'Expirare'}
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    maxLength={5}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc" className="dark:text-gray-200">
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                    maxLength={4}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep('details')} 
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  disabled={isProcessing}
                >
                  {t.planDialog?.back || 'Înapoi'}
                </Button>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.planDialog?.processing || 'Se procesează...'}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      {t.planDialog?.startTrial || 'Începe trial-ul'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="mb-2 dark:text-white">
              {t.planDialog?.success || 'Abonament activat!'}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {t.planDialog?.successMessage || 'Vei primi un email de confirmare în curând.'}
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
