export const clerkTheme = {
  layout: {
    socialButtonsVariant: "iconButton",
    socialButtonsPlacement: "bottom",
    showOptionalFields: false,
    privacyPageUrl: false,
    termsPageUrl: false,
  },
  elements: {
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold w-full",
    card: "bg-transparent shadow-none p-0 m-0",
    formInput: "bg-background border-input text-foreground w-full",
    footerActionLink: "text-primary hover:text-primary/90 font-medium",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
    headerTitle: "text-foreground font-bold text-2xl mb-2",
    headerSubtitle: "text-muted-foreground mb-6",
    socialButtonsIconButton:
      "bg-[#F5F5F1] text-foreground hover:bg-[#E5E5E1] border border-input rounded-full p-2 transition-colors duration-200 shadow-sm",
    socialButtonsBlockButton:
      "bg-[#F5F5F1] text-foreground hover:bg-[#E5E5E1] border border-input w-full justify-center py-2 px-4 rounded transition-colors duration-200 flex items-center space-x-2 shadow-sm font-medium",
    formFieldLabel: "text-foreground font-medium",
    formFieldInput: "bg-background border-input text-foreground w-full",
    formFieldInputShowPasswordButton:
      "text-muted-foreground hover:text-foreground",
    formFieldAction: "text-primary hover:text-primary/90 font-medium",
    footer: "hidden",
    main: "w-full space-y-4",
    form: "w-full space-y-4",
  },
};
