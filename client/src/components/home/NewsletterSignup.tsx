import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeForm = z.infer<typeof subscribeSchema>;

const NewsletterSignup = () => {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SubscribeForm>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: SubscribeForm) => {
      return apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Subscription successful!",
        description: "You've been added to our newsletter.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscribeForm) => {
    trackEvent('submit', 'newsletter', 'email_signup');
    subscribeMutation.mutate(data);
  };

  return (
    <section id="newsletter" className="py-16 bg-cricket-green">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Never Miss an Episode</h2>
          <p className="text-cricket-offwhite mb-8">
            Get notified when new episodes drop, plus exclusive cricket insights and analysis directly to your inbox.
          </p>
          
          {isSuccess ? (
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">✓ Thank you for subscribing!</h3>
              <p className="text-cricket-offwhite">
                You're now on the list. Watch your inbox for cricket insights and episode notifications.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email address"
                          className="py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cricket-gold w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-white/80 text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="bg-cricket-gold text-cricket-text font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200"
                >
                  {subscribeMutation.isPending ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="text-xs text-cricket-offwhite/70 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
