import { Provider } from '@app/providers';
import { CatchBoundary, NotFound } from '@shared/components';
import { seo } from '@shared/utils/seo';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
   head: () => ({
      meta: [
         { charSet: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         ...seo({
            title: 'AutoTrade | Your Trusted Platform for Automated Trading',
            description: 'AutoTrade offers a reliable, automated trading solution for seamless market success.',
         }),
      ],
      links: [
         { rel: 'apple-touch-icon', sizes: '180x180', href: '/seo/apple-touch-icon.png' },
         { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/seo/favicon-32x32.png' },
         { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/seo/favicon-16x16.png' },
         { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
         { rel: 'icon', href: '/seo/favicon.ico' },
      ],
   }),
   errorComponent: props => {
      return <CatchBoundary {...props} />;
   },
   notFoundComponent: () => <NotFound />,
   component: RootComponent,
});

function RootComponent() {
   return (
      <div className='wrapper'>
         <HeadContent />
         <Provider>
            <Outlet />
         </Provider>
         <Scripts />
      </div>
   );
}
