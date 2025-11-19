'use client';

import { Button, Card, Badge, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export default function TestFlowbite() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Flowbite Integration Test
                </h1>

                {/* Alert Component */}
                <Alert color="info" icon={HiInformationCircle}>
                    <span className="font-medium">Flowbite is working!</span> This alert component is from Flowbite React.
                </Alert>

                {/* Buttons */}
                <Card>
                    <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Button>Default</Button>
                            <Button color="alternative">Alternative</Button>
                            <Button color="dark">Dark</Button>
                            <Button color="light">Light</Button>
                            <Button color="green">Green</Button>
                            <Button color="red">Red</Button>
                            <Button color="yellow">Yellow</Button>
                            <Button color="purple">Purple</Button>
                        </div>
                    </div>
                </Card>

                {/* Badges */}
                <Card>
                    <h2 className="text-2xl font-bold mb-4">Badges</h2>
                    <div className="flex flex-wrap gap-4">
                        <Badge color="info">Info</Badge>
                        <Badge color="success">Success</Badge>
                        <Badge color="failure">Failure</Badge>
                        <Badge color="warning">Warning</Badge>
                        <Badge color="indigo">Indigo</Badge>
                    </div>
                </Card>

                {/* Card with Content */}
                <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        Sample Card Title
                    </h5>
                    <p className="font-normal text-gray-700">
                        This is a Flowbite Card component. It demonstrates that Flowbite is properly integrated
                        with Tailwind CSS v4 in your Next.js application.
                    </p>
                    <Button>
                        Read more
                        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </Button>
                </Card>
            </div>
        </div>
    );
}
