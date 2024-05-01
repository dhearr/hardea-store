const styles = {
  sidebar:
    "fixed left-0 top-0 z-0 h-screen w-64 -translate-x-full border-r-[1px] border-[#333333] bg-[#000000] pt-20 transition-transform sm:translate-x-0",
  sidebar__main: "h-full overflow-y-auto bg-[#000000] px-3 pb-4",
  sidebar__main__list: "space-y-2.5 font-semibold",
  sidebar__main__list__link:
    "group flex items-center p-2 rounded-md transition-all duration-200 hover:bg-[#161616] hover:text-white",
  sidebar__main__list__link__icon:
    "flex h-6 w-6 items-center justify-center text-[22px] transition-all duration-200 group-hover:text-white",
  sidebar__main__list__link__title: "ml-3",
};

export { styles };
