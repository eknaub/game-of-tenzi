import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  styled,
  Typography,
} from "@mui/material";
import {
  GameModifier,
  GameModifierCategories,
  GameModifierInfo,
} from "../utils/gameModifierEnums";
import { useGameStore } from "../stores/useGameStore";

const ModifierBoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const FormGroupContainer = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

function GameModifierBox() {
  const { toggleModifier } = useGameStore();
  const selectedModifiers = useGameStore(
    (state) => state.selectedModifiers ?? []
  );
  const isCompModeActivated = selectedModifiers.includes(
    GameModifier.COMPETITIVE_MODE
  );

  return (
    <ModifierBoxContainer>
      <Typography
        variant="h5"
        gutterBottom
        color="textPrimary"
        style={{
          textAlign: "center",
        }}
      >
        Game Modifiers
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        style={{
          fontWeight: "bold",
        }}
      >
        {GameModifierCategories.competitive}
      </Typography>
      <FormGroupContainer>
        <FormControlLabel
          control={
            <Checkbox
              value={GameModifier.COMPETITIVE_MODE}
              checked={selectedModifiers.includes(
                GameModifier.COMPETITIVE_MODE
              )}
              onChange={() => toggleModifier(GameModifier.COMPETITIVE_MODE)}
              aria-label="Competitive Mode Checkbox"
            />
          }
          label={
            <div>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {GameModifierInfo.COMPETITIVE_MODE.name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {GameModifierInfo.COMPETITIVE_MODE.description}
              </Typography>
            </div>
          }
        />
      </FormGroupContainer>
      {isCompModeActivated && (
        <>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{
              fontWeight: "bold",
            }}
          >
            {GameModifierCategories.rollLimits}
          </Typography>
          <FormGroupContainer>
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.ECONOMY}
                  checked={selectedModifiers.includes(GameModifier.ECONOMY)}
                  onChange={() => toggleModifier(GameModifier.ECONOMY)}
                  aria-label="Economy Mode Checkbox"
                />
              }
              label={
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {GameModifierInfo.ECONOMY.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {GameModifierInfo.ECONOMY.description}
                  </Typography>
                </div>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.GIGA_ECONOMY}
                  checked={selectedModifiers.includes(
                    GameModifier.GIGA_ECONOMY
                  )}
                  onChange={() => toggleModifier(GameModifier.GIGA_ECONOMY)}
                  aria-label="Giga Economy Mode Checkbox"
                />
              }
              label={
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {GameModifierInfo.GIGA_ECONOMY.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {GameModifierInfo.GIGA_ECONOMY.description}
                  </Typography>
                </div>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={GameModifier.NO_REROLLS}
                  checked={selectedModifiers.includes(GameModifier.NO_REROLLS)}
                  onChange={() => toggleModifier(GameModifier.NO_REROLLS)}
                  aria-label="No Rerolls Checkbox"
                />
              }
              label={
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {GameModifierInfo.NO_REROLLS.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {GameModifierInfo.NO_REROLLS.description}
                  </Typography>
                </div>
              }
            />
          </FormGroupContainer>
        </>
      )}
    </ModifierBoxContainer>
  );
}

export default GameModifierBox;
