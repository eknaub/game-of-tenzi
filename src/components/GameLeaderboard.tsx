import { styled, Typography, Box } from "@mui/material";
import { DataGrid, type GridRowsProp } from "@mui/x-data-grid";
import { useLeaderboardStore } from "../stores/useLeaderboardStore";
import { useMemo } from "react";
import type { GridColDef } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main || "#1976d2",
    fontWeight: 600,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },
  "& .MuiDataGrid-row": {
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0 !important",
    },
  },
  "& .rank-1": {
    backgroundColor: "#fff9c4 !important",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#fff59d !important",
    },
  },
  "& .rank-2": {
    fontWeight: 600,
  },
  "& .rank-3": {
    fontWeight: 600,
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-row:focus": {
    outline: "none",
  },
}));

function GameLeaderboard() {
  const { leaderboard } = useLeaderboardStore();

  const rows: GridRowsProp = useMemo(() => {
    const sortedEntries = [...leaderboard.entries].sort(
      (a, b) => b.score - a.score
    );
    return sortedEntries.map((entry, idx) => ({
      id: idx + 1,
      rank: idx + 1,
      name: entry.name,
      score: entry.score,
    }));
  }, [leaderboard.entries]);

  const columns: GridColDef[] = [
    {
      field: "rank",
      headerName: "Rank",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const rank = params.value as number;
        return `#${rank}`;
      },
    },
    {
      field: "name",
      headerName: "Player",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "score",
      headerName: "Score",
      minWidth: 100,
      align: "right",
      headerAlign: "right",
      type: "number",
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        Leaderboard
      </Typography>

      <Box sx={{ height: 500, width: "100%" }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          getRowClassName={(params) => `rank-${params.row.rank}`}
        />
      </Box>
    </div>
  );
}

export default GameLeaderboard;
