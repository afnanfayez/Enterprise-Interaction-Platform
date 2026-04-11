export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ar';
export const LOCALE_COOKIE_NAME = 'adel-locale';

export type Direction = 'rtl' | 'ltr';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ar' || value === 'en';
}

export function getLocaleDirection(locale: Locale): Direction {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function detectPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;
  return /\ben\b/i.test(acceptLanguageHeader) ? 'en' : 'ar';
}

export interface AppMessages {
  header: {
    projectName: string;
    languageSwitcherLabel: string;
    switchButtonLabel: string;
  };
  form: {
    title: string;
    subtitle: string;
    countryLabel: string;
    cityLabel: string;
    countryPlaceholder: string;
    cityPlaceholder: string;
    requiredHint: string;
    submitButton: string;
    cancelButton: string;
    currencyLabel: string;
  };
  dropdown: {
    searchPlaceholder: string;
    searchAriaPrefix: string;
    loadingText: string;
    noResultsText: string;
  };
  validation: {
    countryRequired: string;
    cityRequired: string;
    fillRequiredBeforeContinue: string;
    orderTypeRequired: string;
    currencyRequired: string;
    quantityRequired: string;
  };
  requestErrors: {
    countriesLoadFailed: string;
    citiesLoadFailed: string;
  };
  toast: {
    successTitle: string;
    countryLabel: string;
    cityLabel: string;
    currencyLabel: string;
    loginSuccess: string;
    registerSuccess: string;
    orderCreated: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    accountTypeLabel: string;
    accountTypes: {
      individual: string;
      business: string;
      government: string;
      distributor: string;
      agent: string;
    };
    loginButton: string;
    registerButton: string;
    noAccountYet: string;
    alreadyHaveAccount: string;
    logoutButton: string;
  };
  authValidation: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordTooShort: string;
    passwordsDoNotMatch: string;
    nameRequired: string;
    registrationFailed: string;
    loginFailed: string;
    invalidCredentials: string;
  };
  orders: {
    createOrderTitle: string;
    createOrderSubtitle: string;
    orderTypeLabel: string;
    orderTypes: {
      retail: string;
      wholesale: string;
      government: string;
      custom: string;
    };
    descriptionLabel: string;
    descriptionPlaceholder: string;
    quantityLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    reviewTitle: string;
    reviewSubtitle: string;
    submitOrderButton: string;
    backButton: string;
    nextButton: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
  };
  orderConfirmation: {
    title: string;
    subtitle: string;
    orderNumberLabel: string;
    viewOrderButton: string;
    createAnotherButton: string;
  };
  orderDetail: {
    title: string;
    orderNumberLabel: string;
    statusLabel: string;
    orderTypeLabel: string;
    createdAtLabel: string;
    countryLabel: string;
    cityLabel: string;
    currencyLabel: string;
    descriptionLabel: string;
    quantityLabel: string;
    notesLabel: string;
    statusHistoryTitle: string;
    noHistoryYet: string;
  };
  orderStatus: {
    received: string;
    processing: string;
    shipped: string;
    done: string;
    cancelled: string;
  };
  ordersList: {
    title: string;
    searchPlaceholder: string;
    filterByStatus: string;
    allStatuses: string;
    orderNumberColumn: string;
    statusColumn: string;
    typeColumn: string;
    dateColumn: string;
    noOrdersTitle: string;
    noOrdersSubtitle: string;
    createFirstOrderButton: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalOrders: string;
    pendingOrders: string;
    processingOrders: string;
    completedOrders: string;
    recentOrdersTitle: string;
    viewAllOrders: string;
  };
  profile: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    accountTypeLabel: string;
    editButton: string;
    saveButton: string;
    cancelButton: string;
    profileUpdated: string;
  };
  admin: {
    dashboardTitle: string;
    ordersTitle: string;
    updateStatusButton: string;
    statusUpdated: string;
    selectNewStatus: string;
    changedByLabel: string;
    noteLabel: string;
  };
  navigation: {
    dashboard: string;
    orders: string;
    createOrder: string;
    profile: string;
    admin: string;
    adminOrders: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundSubtitle: string;
    goHomeButton: string;
    somethingWentWrong: string;
    tryAgainButton: string;
    networkError: string;
  };
  emptyStates: {
    noOrdersYet: string;
    noOrdersDescription: string;
    createFirstOrder: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    ctaGetStarted: string;
    ctaSignIn: string;
    ctaDashboard: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
    toggleLabel: string;
  };
}

const MESSAGES: Record<Locale, AppMessages> = {
  ar: {
    header: {
      projectName: 'Adel',
      languageSwitcherLabel: 'تبديل اللغة',
      switchButtonLabel: 'EN',
    },
    form: {
      title: 'معلومات العنوان',
      subtitle: 'يرجى اختيار بلدك والمنطقة/المدينة',
      countryLabel: 'البلد',
      cityLabel: 'المنطقة / المدينة',
      countryPlaceholder: 'اختر البلد',
      cityPlaceholder: 'اختر المنطقة / المدينة',
      requiredHint: 'حقل إلزامي',
      submitButton: 'التالي',
      cancelButton: 'إلغاء',
      currencyLabel: 'العملة',
    },
    dropdown: {
      searchPlaceholder: 'بحث...',
      searchAriaPrefix: 'بحث في',
      loadingText: 'جاري التحميل...',
      noResultsText: 'لا توجد نتائج',
    },
    validation: {
      countryRequired: 'يرجى اختيار الدولة',
      cityRequired: 'يرجى اختيار المدينة / المنطقة',
      fillRequiredBeforeContinue: 'يرجى إكمال الحقول المطلوبة قبل المتابعة.',
      orderTypeRequired: 'يرجى اختيار نوع الطلب',
      currencyRequired: 'العملة مطلوبة، يرجى اختيار الدولة أولاً',
      quantityRequired: 'يرجى إدخال كمية صحيحة (1 على الأقل)',
    },
    requestErrors: {
      countriesLoadFailed: 'تعذر تحميل قائمة الدول. يرجى المحاولة مرة أخرى.',
      citiesLoadFailed: 'تعذر تحميل المدن حالياً. يرجى إعادة المحاولة.',
    },
    toast: {
      successTitle: 'تم الحفظ بنجاح!',
      countryLabel: 'الدولة',
      cityLabel: 'المدينة',
      currencyLabel: 'العملة',
      loginSuccess: 'تم تسجيل الدخول بنجاح',
      registerSuccess: 'تم إنشاء الحساب بنجاح',
      orderCreated: 'تم إنشاء الطلب بنجاح',
    },
    auth: {
      loginTitle: 'تسجيل الدخول',
      loginSubtitle: 'أدخل بياناتك للوصول إلى حسابك',
      registerTitle: 'إنشاء حساب جديد',
      registerSubtitle: 'أنشئ حسابك للبدء في استخدام المنصة',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPasswordLabel: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكامل',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: 'أدخل رقم الهاتف',
      accountTypeLabel: 'نوع الحساب',
      accountTypes: {
        individual: 'فرد',
        business: 'شركة',
        government: 'جهة حكومية',
        distributor: 'موزّع',
        agent: 'وكيل',
      },
      loginButton: 'تسجيل الدخول',
      registerButton: 'إنشاء الحساب',
      noAccountYet: 'ليس لديك حساب؟ سجّل الآن',
      alreadyHaveAccount: 'لديك حساب بالفعل؟ سجّل دخولك',
      logoutButton: 'تسجيل الخروج',
    },
    authValidation: {
      emailRequired: 'يرجى إدخال البريد الإلكتروني',
      emailInvalid: 'صيغة البريد الإلكتروني غير صحيحة',
      passwordRequired: 'يرجى إدخال كلمة المرور',
      passwordTooShort: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
      passwordsDoNotMatch: 'كلمتا المرور غير متطابقتين',
      nameRequired: 'يرجى إدخال الاسم',
      registrationFailed: 'تعذّر إنشاء الحساب. يرجى المحاولة مرة أخرى.',
      loginFailed: 'تعذّر تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    },
    orders: {
      createOrderTitle: 'إنشاء طلب جديد',
      createOrderSubtitle: 'أدخل تفاصيل الطلب لإتمام العملية',
      orderTypeLabel: 'نوع الطلب',
      orderTypes: {
        retail: 'تجزئة',
        wholesale: 'جملة',
        government: 'حكومي',
        custom: 'مخصّص',
      },
      descriptionLabel: 'الوصف',
      descriptionPlaceholder: 'أدخل وصفاً للطلب',
      quantityLabel: 'الكمية',
      notesLabel: 'ملاحظات',
      notesPlaceholder: 'أضف أي ملاحظات إضافية (اختياري)',
      reviewTitle: 'مراجعة الطلب',
      reviewSubtitle: 'تأكّد من صحة البيانات قبل الإرسال',
      submitOrderButton: 'إرسال الطلب',
      backButton: 'رجوع',
      nextButton: 'التالي',
      step1Title: 'العنوان',
      step2Title: 'تفاصيل الطلب',
      step3Title: 'المراجعة',
    },
    orderConfirmation: {
      title: 'تم إنشاء الطلب بنجاح!',
      subtitle: 'سيتم مراجعة طلبك ومعالجته في أقرب وقت',
      orderNumberLabel: 'رقم الطلب',
      viewOrderButton: 'عرض الطلب',
      createAnotherButton: 'إنشاء طلب آخر',
    },
    orderDetail: {
      title: 'تفاصيل الطلب',
      orderNumberLabel: 'رقم الطلب',
      statusLabel: 'الحالة',
      orderTypeLabel: 'نوع الطلب',
      createdAtLabel: 'تاريخ الإنشاء',
      countryLabel: 'الدولة',
      cityLabel: 'المدينة',
      currencyLabel: 'العملة',
      descriptionLabel: 'الوصف',
      quantityLabel: 'الكمية',
      notesLabel: 'الملاحظات',
      statusHistoryTitle: 'سجل تغييرات الحالة',
      noHistoryYet: 'لا يوجد سجل تغييرات بعد',
    },
    orderStatus: {
      received: 'تم الاستلام',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      done: 'مكتمل',
      cancelled: 'ملغي',
    },
    ordersList: {
      title: 'الطلبات',
      searchPlaceholder: 'ابحث عن طلب...',
      filterByStatus: 'تصفية حسب الحالة',
      allStatuses: 'جميع الحالات',
      orderNumberColumn: 'رقم الطلب',
      statusColumn: 'الحالة',
      typeColumn: 'النوع',
      dateColumn: 'التاريخ',
      noOrdersTitle: 'لا توجد طلبات',
      noOrdersSubtitle: 'لم يتم العثور على طلبات تطابق معايير البحث',
      createFirstOrderButton: 'إنشاء أول طلب',
    },
    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'نظرة عامة على نشاطك وطلباتك',
      totalOrders: 'إجمالي الطلبات',
      pendingOrders: 'طلبات معلّقة',
      processingOrders: 'قيد المعالجة',
      completedOrders: 'طلبات مكتملة',
      recentOrdersTitle: 'أحدث الطلبات',
      viewAllOrders: 'عرض جميع الطلبات',
    },
    profile: {
      title: 'الملف الشخصي',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'رقم الهاتف',
      accountTypeLabel: 'نوع الحساب',
      editButton: 'تعديل',
      saveButton: 'حفظ',
      cancelButton: 'إلغاء',
      profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
    },
    admin: {
      dashboardTitle: 'لوحة تحكم المسؤول',
      ordersTitle: 'إدارة الطلبات',
      updateStatusButton: 'تحديث الحالة',
      statusUpdated: 'تم تحديث حالة الطلب بنجاح',
      selectNewStatus: 'اختر الحالة الجديدة',
      changedByLabel: 'تم التغيير بواسطة',
      noteLabel: 'ملاحظة',
    },
    navigation: {
      dashboard: 'لوحة التحكم',
      orders: 'الطلبات',
      createOrder: 'طلب جديد',
      profile: 'الملف الشخصي',
      admin: 'الإدارة',
      adminOrders: 'إدارة الطلبات',
    },
    errors: {
      notFoundTitle: 'الصفحة غير موجودة',
      notFoundSubtitle: 'عذراً، الصفحة التي تبحث عنها غير متوفرة',
      goHomeButton: 'العودة للرئيسية',
      somethingWentWrong: 'حدث خطأ غير متوقع',
      tryAgainButton: 'إعادة المحاولة',
      networkError: 'تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.',
    },
    emptyStates: {
      noOrdersYet: 'لا توجد طلبات حتى الآن',
      noOrdersDescription: 'ابدأ بإنشاء طلبك الأول للاستفادة من خدماتنا',
      createFirstOrder: 'إنشاء أول طلب',
    },
    landing: {
      heroTitle: 'منصة إدارة الطلبات المتكاملة',
      heroSubtitle: 'أنشئ وتتبّع وأدِر طلباتك بسهولة — للأفراد والشركات والجهات الحكومية',
      ctaGetStarted: 'ابدأ الآن',
      ctaSignIn: 'تسجيل الدخول',
      ctaDashboard: 'الذهاب للوحة التحكم',
      feature1Title: 'إدارة الطلبات',
      feature1Desc: 'أنشئ وتابع طلباتك بكل سهولة مع نظام متكامل لإدارة الطلبات',
      feature2Title: 'تتبّع الحالة',
      feature2Desc: 'تابع حالة طلباتك لحظة بلحظة من الاستلام وحتى التسليم',
      feature3Title: 'دعم متعدد العملات',
      feature3Desc: 'ادعم عمليات الطلب بعملات متعددة لتغطية الأسواق المختلفة',
    },
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      system: 'تلقائي',
      toggleLabel: 'تبديل المظهر',
    },
  },
  en: {
    header: {
      projectName: 'Adel',
      languageSwitcherLabel: 'Switch language',
      switchButtonLabel: 'AR',
    },
    form: {
      title: 'Address Information',
      subtitle: 'Please select your country and city/region',
      countryLabel: 'Country',
      cityLabel: 'City / Region',
      countryPlaceholder: 'Select country',
      cityPlaceholder: 'Select city / region',
      requiredHint: 'Required field',
      submitButton: 'Next',
      cancelButton: 'Cancel',
      currencyLabel: 'Currency',
    },
    dropdown: {
      searchPlaceholder: 'Search...',
      searchAriaPrefix: 'Search in',
      loadingText: 'Loading...',
      noResultsText: 'No results found',
    },
    validation: {
      countryRequired: 'Please select a country',
      cityRequired: 'Please select a city / region',
      fillRequiredBeforeContinue: 'Please complete the required fields before continuing.',
      orderTypeRequired: 'Please select an order type',
      currencyRequired: 'Currency is required — please select a country first',
      quantityRequired: 'Please enter a valid quantity (at least 1)',
    },
    requestErrors: {
      countriesLoadFailed: 'Unable to load countries. Please try again.',
      citiesLoadFailed: 'Unable to load cities right now. Please try again.',
    },
    toast: {
      successTitle: 'Saved successfully!',
      countryLabel: 'Country',
      cityLabel: 'City',
      currencyLabel: 'Currency',
      loginSuccess: 'Signed in successfully',
      registerSuccess: 'Account created successfully',
      orderCreated: 'Order created successfully',
    },
    auth: {
      loginTitle: 'Sign In',
      loginSubtitle: 'Enter your credentials to access your account',
      registerTitle: 'Create an Account',
      registerSubtitle: 'Sign up to start using the platform',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      accountTypeLabel: 'Account Type',
      accountTypes: {
        individual: 'Individual',
        business: 'Business',
        government: 'Government',
        distributor: 'Distributor',
        agent: 'Agent',
      },
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      noAccountYet: "Don't have an account? Sign up",
      alreadyHaveAccount: 'Already have an account? Sign in',
      logoutButton: 'Sign Out',
    },
    authValidation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordsDoNotMatch: 'Passwords do not match',
      nameRequired: 'Name is required',
      registrationFailed: 'Registration failed. Please try again.',
      loginFailed: 'Login failed. Please try again.',
      invalidCredentials: 'Invalid email or password',
    },
    orders: {
      createOrderTitle: 'Create New Order',
      createOrderSubtitle: 'Enter order details to proceed',
      orderTypeLabel: 'Order Type',
      orderTypes: {
        retail: 'Retail',
        wholesale: 'Wholesale',
        government: 'Government',
        custom: 'Custom',
      },
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Enter a description for the order',
      quantityLabel: 'Quantity',
      notesLabel: 'Notes',
      notesPlaceholder: 'Add any additional notes (optional)',
      reviewTitle: 'Review Order',
      reviewSubtitle: 'Verify the details before submitting',
      submitOrderButton: 'Submit Order',
      backButton: 'Back',
      nextButton: 'Next',
      step1Title: 'Address',
      step2Title: 'Order Details',
      step3Title: 'Review',
    },
    orderConfirmation: {
      title: 'Order Created Successfully!',
      subtitle: 'Your order will be reviewed and processed shortly',
      orderNumberLabel: 'Order Number',
      viewOrderButton: 'View Order',
      createAnotherButton: 'Create Another Order',
    },
    orderDetail: {
      title: 'Order Details',
      orderNumberLabel: 'Order Number',
      statusLabel: 'Status',
      orderTypeLabel: 'Order Type',
      createdAtLabel: 'Created At',
      countryLabel: 'Country',
      cityLabel: 'City',
      currencyLabel: 'Currency',
      descriptionLabel: 'Description',
      quantityLabel: 'Quantity',
      notesLabel: 'Notes',
      statusHistoryTitle: 'Status History',
      noHistoryYet: 'No status changes recorded yet',
    },
    orderStatus: {
      received: 'Received',
      processing: 'Processing',
      shipped: 'Shipped',
      done: 'Completed',
      cancelled: 'Cancelled',
    },
    ordersList: {
      title: 'Orders',
      searchPlaceholder: 'Search orders...',
      filterByStatus: 'Filter by status',
      allStatuses: 'All Statuses',
      orderNumberColumn: 'Order Number',
      statusColumn: 'Status',
      typeColumn: 'Type',
      dateColumn: 'Date',
      noOrdersTitle: 'No Orders Found',
      noOrdersSubtitle: 'No orders match the current search criteria',
      createFirstOrderButton: 'Create Your First Order',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'An overview of your activity and orders',
      totalOrders: 'Total Orders',
      pendingOrders: 'Pending Orders',
      processingOrders: 'Processing',
      completedOrders: 'Completed Orders',
      recentOrdersTitle: 'Recent Orders',
      viewAllOrders: 'View All Orders',
    },
    profile: {
      title: 'Profile',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone Number',
      accountTypeLabel: 'Account Type',
      editButton: 'Edit',
      saveButton: 'Save',
      cancelButton: 'Cancel',
      profileUpdated: 'Profile updated successfully',
    },
    admin: {
      dashboardTitle: 'Admin Dashboard',
      ordersTitle: 'Manage Orders',
      updateStatusButton: 'Update Status',
      statusUpdated: 'Order status updated successfully',
      selectNewStatus: 'Select new status',
      changedByLabel: 'Changed by',
      noteLabel: 'Note',
    },
    navigation: {
      dashboard: 'Dashboard',
      orders: 'Orders',
      createOrder: 'New Order',
      profile: 'Profile',
      admin: 'Admin',
      adminOrders: 'Manage Orders',
    },
    errors: {
      notFoundTitle: 'Page Not Found',
      notFoundSubtitle: 'Sorry, the page you are looking for does not exist',
      goHomeButton: 'Go to Homepage',
      somethingWentWrong: 'Something went wrong',
      tryAgainButton: 'Try Again',
      networkError: 'Unable to connect to the server. Check your internet connection.',
    },
    emptyStates: {
      noOrdersYet: 'No orders yet',
      noOrdersDescription: 'Create your first order to get started',
      createFirstOrder: 'Create Your First Order',
    },
    landing: {
      heroTitle: 'Your Complete Order Management Platform',
      heroSubtitle: 'Create, track, and manage your orders with ease — for individuals, businesses, and government entities',
      ctaGetStarted: 'Get Started',
      ctaSignIn: 'Sign In',
      ctaDashboard: 'Go to Dashboard',
      feature1Title: 'Order Management',
      feature1Desc: 'Create and track your orders with a comprehensive order management system',
      feature2Title: 'Status Tracking',
      feature2Desc: 'Monitor your order status in real-time from receipt to delivery',
      feature3Title: 'Multi-Currency Support',
      feature3Desc: 'Support orders in multiple currencies to cover different markets',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      toggleLabel: 'Toggle theme',
    },
  },
};

export function getMessages(locale: Locale): AppMessages {
  return MESSAGES[locale];
}
