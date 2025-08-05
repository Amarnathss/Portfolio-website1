import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendTestSMS = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/sms/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "SMS Sent!",
          description: `Message sent successfully! SID: ${result.sid}`,
        });
        setMessage("");
      } else {
        throw new Error(result.error || 'Failed to send SMS');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send SMS",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createTestUser = async () => {
    setIsLoading(true);
    try {
      const username = `user_${Date.now()}`;
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: 'testpassword123'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "User Created!",
          description: `User '${username}' created successfully with welcome SMS!`,
        });
      } else {
        throw new Error(result.error || 'Failed to create user');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-chalk-body relative">
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="font-chalk text-3xl md:text-4xl lg:text-5xl font-bold chalk-text chalk-glow text-center mb-12">
            <span className="chalk-underline">SMS Testing Dashboard</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {/* SMS Test */}
            <div className="chalk-box p-6 md:p-8">
              <h3 className="font-chalk text-2xl chalk-text text-chalk-accent mb-6">Send Test SMS</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-chalk-body chalk-text text-lg mb-2" htmlFor="sms-message">
                    Message
                  </label>
                  <textarea 
                    id="sms-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Enter your test message..."
                    className="w-full chalk-input chalk-text font-chalk-body focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>
                
                <button 
                  onClick={sendTestSMS}
                  disabled={isLoading}
                  className="w-full chalk-box py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300 chalk-hover disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sms mr-2"></i>
                      Send SMS to +91-9731103004
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* User Creation Test */}
            <div className="chalk-box p-6 md:p-8">
              <h3 className="font-chalk text-2xl chalk-text text-chalk-accent mb-6">Test User Creation</h3>
              
              <div className="space-y-4">
                <p className="font-chalk-body chalk-text">
                  Create a test user and receive a welcome SMS notification.
                </p>
                
                <button 
                  onClick={createTestUser}
                  disabled={isLoading}
                  className="w-full chalk-box py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300 chalk-hover disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus mr-2"></i>
                      Create Test User + Send Welcome SMS
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* API Status */}
            <div className="chalk-box p-6 md:p-8">
              <h3 className="font-chalk text-2xl chalk-text text-chalk-accent mb-6">Integration Status</h3>
              
              <div className="space-y-3 font-chalk-body chalk-text">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  <span>MongoDB Connected</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  <span>Twilio Integration Active</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  <span>SMS Endpoint: +91-9731103004</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  <span>Account SID: AC***...***</span>
                </div>
              </div>
            </div>

            {/* Navigation back */}
            <div className="text-center">
              <a 
                href="/" 
                className="inline-block chalk-box px-6 py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300 chalk-hover"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
