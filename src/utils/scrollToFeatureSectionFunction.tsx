export const scrollToFeatureSectionFunction = (
    metaAccounts: any[],
    isAuthenticated: boolean,
    navigate: Function,
    featureSectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (Array.isArray(metaAccounts) && metaAccounts.length > 0 && isAuthenticated) {
      navigate("/user/dashboard");
    }
    if (featureSectionRef.current) {
      featureSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

