/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageProvider } from "@/lib/LanguageContext";
import StarCodeApp from "./StarCodeApp";

export default function App() {
  return (
    <LanguageProvider>
      <StarCodeApp />
    </LanguageProvider>
  );
}



