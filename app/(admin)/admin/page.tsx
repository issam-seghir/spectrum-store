import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/admin/overview-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 12; i++) {
        data.push({
            name: `Month ${i + 1}`,
            total: Math.floor(Math.random() * 1000) + 1,
        });
    }
    return data;
};
const DashboardPage: React.FC = async () => {

const graphRevenue = generateRandomData();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Overview of your store
                    </p>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3">
                    <Card className="flex-grow basis-1/3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                        </CardContent>
                    </Card>
                    <Card className="flex-grow basis-1/3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+90</div>
                        </CardContent>
                    </Card>
                    <Card className="flex-grow basis-1/3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">25</div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
