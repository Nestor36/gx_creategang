import { SendNuiMessage } from "../Utils/SendNuiMessage";
import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import { TriggerNuiCallback } from "../Utils/TriggerNuiCallback";
import { HandleNuiMessage } from "../Hooks/HandleNuiMessage";

interface PlayerInformation {
  name: string;
  identifiers: string[];
}

SendNuiMessage([{ action: "setVisibleApp", data: true }]);

export const App: FC = () => {
  const [playerInformation, setPlayerInformation] =
    useState<PlayerInformation | null>(null);

  const getPlayerInformation = () => {
    TriggerNuiCallback<PlayerInformation>("getplayerInformation")
      .then((info) => {
        setPlayerInformation(info);
      })
      .catch((_) => {
        setPlayerInformation(null);
      });
  };

  const LoadInformation = () => {
    if (playerInformation === null) return <></>;
    return (
      <div>
        <h1 className="text-center align-center">{playerInformation.name}</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Id</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Identifier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(playerInformation.identifiers).map(
              ([type, value], i) => (
                <TableRow>
                  <TableCell>{i}</TableCell>
                  <TableCell className="font-medium">
                    {type.toUpperCase()}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  HandleNuiMessage<any>("setVisibleApp", () => {
    setPlayerInformation(null);
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="text-center p-6 gap-0 bg-white shadow-md rounded-lg border-black border-2">
        <div>{LoadInformation()}</div>
        <div className="mt-0">
          <Button
            className="cursor-pointer hover:bg-black hover:text-white"
            variant="outline"
            onClick={getPlayerInformation}
          >
            GET PLAYER INFORMATION
          </Button>
        </div>
      </Card>
    </div>
  );
};
