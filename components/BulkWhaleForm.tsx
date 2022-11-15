import { Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import UploadBox from "./UploadBox";

export default function BulkWhaleForm() {
        return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <div className="mt-2 mx-auto max-w-lg">
                    <h1 className="text-lg mb-1">Explore by Marketplace</h1>
                    <div>
                        <div>
                            <Button className="w-1/2 mb-1">Paras</Button>
                        </div>
                        <div>
                            <Button className="w-1/2 mb-1">Mintbase</Button>
                        </div>
                        <div>
                            <Button className="w-1/2 mb-1">Few & Far</Button>
                        </div>
                        <br />
                        <p>* Only shows the latest 100 transactions of each wallet</p>
                    </div>
                    <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-lg mb-1">Explore by Input</h1>
                    <div>

                        <UploadBox />
                        <br />
                        <p>* Download CSV sample <b>here</b></p>
                        <p>*** Only shows the latest 100 transactions of each wallet</p>
                    </div>
                </div>
            </div>
        </Content>
    )
}