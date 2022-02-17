import styled from "styled-components/native";
import { SafeAreaView } from "react-native";

import colors from "../../assets/theme/colors";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${colors.white};
  align-items: center;
  justify-content: center;
`;
